import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { modules } from 'src/app/modules';
import { isProd } from '../utils/environment.utils';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      include: modules,
      useGlobalPrefix: true,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      graphiql: !isProd(),
      subscription: true,
    }),
  ],
})
export class GraphQlModule {}
