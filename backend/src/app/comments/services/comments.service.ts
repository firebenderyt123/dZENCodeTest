import { flatMap, dropRight } from 'lodash';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOneOptions,
  FindOptionsOrder,
  In,
  IsNull,
  Repository,
} from 'typeorm';
import { UsersProfileService } from '../../users/services/users-profile.service';
import { CreateCommentArgs } from '../dto/create-comment.dto';
import { CommentAttachmentsService } from './comment-attachments.service';
import { FileInput } from 'src/app/files/interfaces/file-input.interface';
import { CommentList } from '../models/comment-list.model';
import { Comment as CommentModel } from '../models/comment.model';
import { Comment } from '../entities/comment.entity';

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
    commentData: CreateCommentArgs,
    files: FileInput[],
  ): Promise<CommentModel> {
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
      createdAt: savedComment.createdAt.toISOString(),
      attachments: flatMap(savedAttachments, ({ fileId, file }) => ({
        fileId,
        containerName: file.containerName,
        fileUrl: file.fileUrl,
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
