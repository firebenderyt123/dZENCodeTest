import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, IsNull, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from '../users/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private usersRepositoty: Repository<User>,
  ) {}

  async create(commentData: CreateCommentDto): Promise<Comment> {
    const { user_id, parent_comment_id, text } = commentData;

    const comment = new Comment();

    comment.parent = parent_comment_id
      ? await this.commentRepository.findOneBy({
          id: parent_comment_id,
        })
      : null;

    comment.user = await this.usersRepositoty.findOneBy({
      id: user_id,
    });

    comment.text = text;

    return await this.commentRepository.save(comment);
  }

  async find(
    page: number,
    limit: number,
    order: FindOptionsOrder<Comment>,
  ): Promise<{ data: Comment[]; total: { pages: number; comments: number } }> {
    const [rootComments, totalComments] =
      await this.commentRepository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
        where: { parent: IsNull() },
        order,
        relations: ['user'],
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
      data: allComments,
      total: {
        pages: Math.ceil(totalComments / limit),
        comments: totalComments,
      },
    };
  }

  async remove(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }

  private async getAllCommentsWithChildren(
    commentId: number,
    order: FindOptionsOrder<Comment>,
  ): Promise<Comment[]> {
    const comments = await this.commentRepository.find({
      where: { parent: { id: commentId } },
      order,
      relations: ['user'],
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
