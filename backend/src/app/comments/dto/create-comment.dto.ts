import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Length } from 'class-validator';
import { CleanTextHTML } from 'src/lib/decorators/clean-text.decorator';
import { TrimLowercase } from 'src/lib/decorators/trim-lowercase.decorator';
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal';

@ArgsType()
export class CreateCommentArgs {
  @Field(() => Int, { nullable: true })
  parentId: number | null;

  @Field(() => String)
  @Length(20, 4096)
  @TrimLowercase()
  @CleanTextHTML()
  text: string;

  @Field(() => [GraphQLUpload])
  files: FileUpload[];
}
