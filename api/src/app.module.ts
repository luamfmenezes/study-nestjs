import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import RepoModule from './repo.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import ormConfig from './config/orm';

import UserResolver from './resolvers/user.resolver';
import MessageResolver from './resolvers/message.resolver';

import { GraphQLModule } from '@nestjs/graphql';

const graphQLImports = [UserResolver, MessageResolver];

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    RepoModule,
    ...graphQLImports,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
      installSubscriptionHandlers: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
