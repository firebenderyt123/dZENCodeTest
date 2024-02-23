import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, IsNull, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentList } from './interfaces/comment-list.interface';
import { CommentsGateway } from '../websocket/comments/comments.gateway';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private usersService: UsersService,
    private commentsGateway: CommentsGateway,
  ) {}

  async create(
    userId: number,
    commentData: CreateCommentDto,
  ): Promise<Comment> {
    const { parentId, text } = commentData;

    const comment = new Comment();

    comment.parent = parentId
      ? await this.commentRepository.findOneBy({
          id: parentId,
        })
      : null;

    comment.user = await this.usersService.findOneBy({
      id: userId,
    });

    comment.text = text;
    const savedComment = await this.commentRepository.save(comment);

    this.commentsGateway.commentPublishedBroadcast(savedComment);

    return savedComment;
  }

  async find(
    page: number,
    limit: number,
    order: FindOptionsOrder<Comment>,
  ): Promise<CommentList> {
    const [rootComments, totalComments] =
      await this.commentRepository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
        where: { parent: IsNull() },
        order,
        relations: ['user', 'attachments'],
      });

    const allComments = await Promise.all(
      rootComments.map(async (comment) => {
        const children = await this.getAllCommentsWithChildren(
          comment.id,
          order,
        );
        comment.replies = children;
        return comment;
      }),
    );

    return {
      comments: allComments,
      total: {
        pages: Math.ceil(totalComments / limit),
        comments: totalComments,
      },
    };
  }

  async remove(commentId: number, userId: number): Promise<void> {
    const comment = await this.findCommentWithUserById(commentId);

    if (!comment) return;

    if (comment.user.id !== userId)
      throw new ForbiddenException(
        'You are not allowed to delete this comment',
      );

    await this.commentRepository.delete(commentId);
  }

  async findCommentWithUserById(id: number): Promise<Comment | null> {
    return await this.commentRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  private async getAllCommentsWithChildren(
    commentId: number,
    order: FindOptionsOrder<Comment>,
  ): Promise<Comment[]> {
    const comments = await this.commentRepository.find({
      where: { parent: { id: commentId } },
      order,
      relations: ['user', 'attachments', 'attachments.file'],
      select: {
        attachments: {
          fileId: true,
          file: {
            containerName: true,
            fileUrl: true,
          },
        },
      },
    });

    if (comments.length === 0) {
      return [];
    }

    const commentsWithChildren = await Promise.all(
      comments.map(async (comment) => {
        const children = await this.getAllCommentsWithChildren(
          comment.id,
          order,
        );
        comment.replies = children;
        return comment;
      }),
    );

    return commentsWithChildren;
  }
}
