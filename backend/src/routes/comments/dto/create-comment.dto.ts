import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCommentDto {
  @IsDefined({ message: 'User id is required' })
  @IsNumber({}, { message: 'User id should be a number' })
  userId: number;

  @IsNumber({}, { message: 'Parent comment id should be a number' })
  @IsOptional()
  parentId?: number;

  @IsDefined({ message: 'Text is required' })
  @MinLength(20, { message: 'Text should be at least 20 characters long' })
  @MaxLength(4096, {
    message: 'Text should be less than 4096 characters long',
  })
  @IsString({ message: 'Text should be a string' })
  @Transform(({ value }) => typeof value === 'string' && value.trim())
  text: string;
}
