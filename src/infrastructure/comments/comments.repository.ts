import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../../domain/entities/comment.entity';
import { CreateCommentDto } from '../../components/comments/dto/create-comment.dto';
import { UpdateCommentDto } from '../../components/comments/dto/update-comment.dto';
import { User } from '../../domain/entities/user.entity';
import { Task } from '../../domain/entities/task.entity';
import { ICommentRepository } from './comments.repository.interface';

@Injectable()
export class CommentsRepository implements ICommentRepository {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async create(createCommentDto: CreateCommentDto, user: User): Promise<Comment> {
    if (user.role !== 'author') {
      throw new ForbiddenException('Only authors can create comments');
    }

    const task = await this.tasksRepository.findOneBy({ id: createCommentDto.task_id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${createCommentDto.task_id} not found`);
    }

    const comment = this.commentsRepository.create({
      ...createCommentDto,
      user,
      task,
    });
    return this.commentsRepository.save(comment);
  }

  async findAll(taskId: string): Promise<Comment[]> {
    return this.commentsRepository.find({
      where: { task: { id: taskId } },
      order: { created_at: 'DESC' },
      relations: ['user', 'task'],
    });
  }

  async findById(id: string): Promise<Comment | null> {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['user', 'task'],
    });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto, user: User): Promise<Comment> {
    const comment = await this.findById(id);
    if (comment.user.id !== user.id) {
      throw new ForbiddenException('You can only edit your own comments');
    }
    this.commentsRepository.merge(comment, updateCommentDto);
    return this.commentsRepository.save(comment);
  }

  async remove(id: string, user: User): Promise<void> {
    const comment = await this.findById(id);
    if (comment.user.id !== user.id) {
      throw new ForbiddenException('You can only delete your own comments');
    }
    await this.commentsRepository.remove(comment);
  }
}
