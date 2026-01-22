import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../infrastructure/users/users.module';
import { AuthModule } from '../infrastructure/auth/auth.module';
import { CommentsModule } from '../infrastructure/comments/comments.module';
import { TasksModule } from '../infrastructure/tasks/tasks.module';
import { User } from '../domain/entities/user.entity';
import { Comment } from '../domain/entities/comment.entity';
import { Task } from '../domain/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'password',
      database: process.env.POSTGRES_DB || 'crm_db',
      entities: [User, Comment, Task],
      synchronize: true, // Don't use this in production
    }),
    UsersModule,
    AuthModule,
    CommentsModule,
    TasksModule,
  ],
})
export class AppModule {}
