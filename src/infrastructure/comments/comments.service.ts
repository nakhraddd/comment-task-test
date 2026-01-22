import { Inject, Injectable } from '@nestjs/common';
import { Comment } from '../../domain/entities/comment.entity';
import { CreateCommentDto } from '../../components/comments/dto/create-comment.dto';
import { UpdateCommentDto } from '../../components/comments/dto/update-comment.dto';
import { User } from '../../domain/entities/user.entity';
import { ICommentRepository } from './comments.repository.interface';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(ICommentRepository)
    private readonly commentsRepository: ICommentRepository,
  ) {}

  create(createCommentDto: CreateCommentDto, user: User): Promise<Comment> {
    return this.commentsRepository.create(createCommentDto, user);
  }

  findAll(taskId: string): Promise<Comment[]> {
    return this.commentsRepository.findAll(taskId);
  }

  findOne(id: string): Promise<Comment> {
    return this.commentsRepository.findById(id);
  }

  update(id: string, updateCommentDto: UpdateCommentDto, user: User): Promise<Comment> {
    return this.commentsRepository.update(id, updateCommentDto, user);
  }

  remove(id: string, user: User): Promise<void> {
    return this.commentsRepository.remove(id, user);
  }
}
