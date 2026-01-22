import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from '../../domain/entities/task.entity';
import { ITaskRepository } from './tasks.repository.interface';
import { TasksRepository } from './tasks.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UsersModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: ITaskRepository,
      useClass: TasksRepository,
    },
  ],
  exports: [TasksService],
})
export class TasksModule {}
