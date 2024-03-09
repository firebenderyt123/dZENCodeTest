import { ArgsType, Field } from '@nestjs/graphql';
import { UUID } from 'crypto';

@ArgsType()
export class UUIDArgs {
  @Field(() => String)
  uuid: UUID;
}
