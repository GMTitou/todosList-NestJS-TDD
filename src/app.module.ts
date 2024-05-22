import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AppController } from './app.controller';

@Module({
  imports: [UserModule, TaskModule, DatabaseModule],
  controllers: [AppController],
})
export class AppModule {}
