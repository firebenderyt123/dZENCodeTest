import { NestFactory } from '@nestjs/core';
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';
import { printSchema } from 'graphql';
import { resolvers } from './app/modules';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function generateSchema() {
  const app = await NestFactory.create<NestFastifyApplication>(
    GraphQLSchemaBuilderModule,
    new FastifyAdapter(),
  );
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create(resolvers);
  console.log(printSchema(schema));
}
generateSchema();
