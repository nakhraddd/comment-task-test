import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from '../../domain/entities/comment.entity';
import { Task } from '../../domain/entities/task.entity';
import { ICommentRepository } from './comments.repository.interface';
import { CommentsRepository } from './comments.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Task])],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    {
      provide: ICommentRepository,
      useClass: CommentsRepository,
    },
  ],
})
export class CommentsModule {}
