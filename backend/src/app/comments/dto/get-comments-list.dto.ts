import { Transform } from 'class-transformer';
import { IsIn, IsOptional, Min, Max } from 'class-validator';

export class GetCommentsListDto {
  @IsOptional()
  @Transform((page) => parseInt(page.value, 10))
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Transform((limit) => parseInt(limit.value, 10))
  @Min(1)
  @Max(100)
  limit: number = 25;

  @IsOptional()
  @IsIn(['username', 'email', 'createdAt'], {
    message: 'Invalid orderBy parameter',
  })
  orderBy: 'username' | 'email' | 'createdAt' = 'createdAt';

  @IsOptional()
  @IsIn(['ASC', 'DESC', 'asc', 'desc'], {
    message: 'Invalid order parameter',
  })
  order: 'ASC' | 'DESC' | 'asc' | 'desc' = 'DESC';
}
