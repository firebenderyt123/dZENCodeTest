import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TrimLowercase } from 'src/decorators/trim-lowercase.decorator';

export class CreateCommentDto {
  @IsNumber({}, { message: 'Parent comment id should be a number' })
  @IsOptional()
  parentId?: number;

  @IsDefined({ message: 'Text is required' })
  @MinLength(20, { message: 'Text should be at least 20 characters long' })
  @MaxLength(4096, {
    message: 'Text should be less than 4096 characters long',
  })
  @IsString({ message: 'Text should be a string' })
  @TrimLowercase()
  text: string;
}
