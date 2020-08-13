import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import RepoModule from './repo.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import ormConfig from './config/orm';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), RepoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
