import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CommentAttachment {
  @Field(() => Int)
  fileId: number;

  @Field()
  containerName: string;

  @Field()
  fileUrl: string;
}
