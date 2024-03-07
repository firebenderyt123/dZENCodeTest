import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { modules } from 'src/modules';

@Module({
  imports: [
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      include: modules,
      useGlobalPrefix: true,
      autoSchemaFile: 'src/schema.gql',
      subscription: true,
    }),
  ],
})
export class GraphQlModule {}
