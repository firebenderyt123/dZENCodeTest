import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsOrder, IsNull, Repository } from 'typeorm';
import { UsersProfileService } from '../users/services/users-profile.service';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FileUpload } from '../files/interfaces/file-upload.interface';
import { CommentAttachmentsService } from './comment-attachments.service';
import { CommentCreated } from './interfaces/comment-created.interface';
import { CommentList } from './interfaces/comment-list';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private commentAttachmentsService: CommentAttachmentsService,
    private usersProfileService: UsersProfileService,
  ) {}

  async create(
    userId: number,
    commentData: CreateCommentDto,
    files: FileUpload[],
  ): Promise<CommentCreated> {
    const { parentId, text } = commentData;

    const comment = new Comment();
    comment.parent = parentId
      ? await this.commentRepository.findOneBy({
          id: parentId,
        })
      : null;
    comment.user = await this.usersProfileService.findOneBy({
      id: userId,
    });
    comment.text = text;

    const savedComment = await this.commentRepository.save(comment);
    const savedAttachments =
      await this.commentAttachmentsService.saveAttachments(
        savedComment.id,
        files,
      );
    const response = {
      ...savedComment,
      replies: [],
      attachments: savedAttachments.map(({ fileId, file }) => ({
        fileId,
        file: {
          containerName: file.containerName,
          fileUrl: file.fileUrl,
        },
      })),
    };
    return response;
  }

  async find(
    page: number,
    limit: number,
    order?: FindOptionsOrder<Comment>,
  ): Promise<CommentList> {
    const [rootComments, totalComments] =
      await this.commentRepository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
        where: { parent: IsNull() },
        order,
        relations: ['user', 'attachments', 'attachments.file'],
      });

    const allComments = await Promise.all(
      rootComments.map(async (comment) => {
        const children = await this.getAllCommentsWithChildren({
          where: { parent: { id: comment.id } },
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
    options: FindOneOptions<Comment>,
  ): Promise<Comment[]> {
    const comments = await this.commentRepository.find(options);

    if (comments.length === 0) {
      return [];
    }

    const commentsWithChildren = await Promise.all(
      comments.map(async (comment) => {
        const children = await this.getAllCommentsWithChildren({
          ...options,
          where: { parent: { id: comment.id } },
        });
        comment.replies = children;
        return comment;
      }),
    );

    return commentsWithChildren;
  }

  async getCommentWithSpecialParamsById(
    commentId: number,
    options?: FindOneOptions<Comment>,
  ): Promise<Comment | null> {
    const comment = await this.commentRepository.findOne({
      ...options,
      where: { id: commentId },
      relations: ['user', 'replies', 'attachments', 'attachments.file'],
    });

    return comment;
  }
}
