import { flatMap, dropRight } from 'lodash';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, In, IsNull, Repository } from 'typeorm';
import { UsersService } from '../../users/services/users.service';
import { CreateCommentArgs } from '../dto/create-comment.dto';
import { CommentAttachmentsService } from './comment-attachments.service';
import { CommentList } from '../models/comment-list.model';
import { Comment as CommentModel } from '../models/comment.model';
import { Comment } from '../entities/comment.entity';
import { GetCommentListArgs } from '../dto/get-comment-list.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private commentAttachmentsService: CommentAttachmentsService,
    private usersService: UsersService,
  ) {}

  async create(
    userId: number,
    commentData: CreateCommentArgs,
  ): Promise<number> {
    const { parentId, text } = commentData;

    const comment = new Comment();
    comment.parent = parentId
      ? await this.commentRepository.findOneBy({
          id: parentId,
        })
      : null;
    comment.user = await this.usersService.findOneById(userId);
    comment.text = text;

    const newComment = await this.commentRepository.save(comment);
    return newComment.id;
  }

  async getComments(args: GetCommentListArgs): Promise<CommentList> {
    const { page, limit, orderBy, order } = args;
    const [rootComments, totalComments] =
      await this.commentRepository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
        where: { parent: IsNull() },
        order: await this.getOrder(orderBy, order),
        relations: ['user', 'attachments', 'attachments.file'],
      });

    const comments = this.commentEntityToCommentModel(rootComments);
    const parentIds = flatMap(comments, (comment) => comment.id);
    const [replies, repliesLength] = await this.getAllReplies(parentIds);

    return {
      comments: [...comments, ...replies],
      commentsLength: [comments.length, ...dropRight(repliesLength)],
      totalPages: Math.ceil(totalComments / limit),
      totalComments: totalComments,
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

  private async getAllReplies(
    parentIds: number[],
  ): Promise<[CommentModel[], number[]]> {
    const repliesList = await this.commentRepository.find({
      where: { parent: In(parentIds) },
      relations: ['user', 'parent', 'attachments', 'attachments.file'],
    });
    const newReplies = this.commentEntityToCommentModel(repliesList);
    const newParentIds = flatMap(newReplies, (reply) => reply.id);
    if (!newParentIds.length) return [newReplies, [newReplies.length]];
    const [replies, repliesLength] = await this.getAllReplies(newParentIds);
    return [
      [...newReplies, ...replies],
      [newReplies.length, ...repliesLength],
    ];
  }

  private commentEntityToCommentModel(comments: Comment[]): CommentModel[] {
    const newComments = flatMap(
      comments,
      ({ parent, createdAt, attachments, ...restReply }) => ({
        ...restReply,
        createdAt: createdAt.toISOString(),
        parent: parent ? { id: parent.id, text: parent.text } : null,
        attachments: flatMap(attachments, ({ fileId, file }) => ({
          fileId,
          containerName: file.containerName,
          fileUrl: file.fileUrl,
        })),
      }),
    );
    return newComments;
  }

  private async getOrder(
    orderBy: 'username' | 'email' | 'createdAt',
    order: 'ASC' | 'DESC',
  ): Promise<FindOptionsOrder<Comment>> {
    const obj = {
      [orderBy]: order.toUpperCase(),
    };
    const orderObj =
      orderBy === 'username' || orderBy === 'email'
        ? {
            user: obj,
          }
        : obj;
    return orderObj;
  }
}
