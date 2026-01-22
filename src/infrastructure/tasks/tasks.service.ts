import { Inject, Injectable } from '@nestjs/common';
import { Task } from '../../domain/entities/task.entity';
import { CreateTaskDto } from '../../components/tasks/dto/create-task.dto';
import { UpdateTaskDto } from '../../components/tasks/dto/update-task.dto';
import { User } from '../../domain/entities/user.entity';
import { ITaskRepository } from './tasks.repository.interface';

@Injectable()
export class TasksService {
  constructor(
    @Inject(ITaskRepository)
    private readonly tasksRepository: ITaskRepository,
  ) {}

  create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.create(createTaskDto, user);
  }

  findAll(): Promise<Task[]> {
    return this.tasksRepository.findAll();
  }

  findOne(id: string): Promise<Task> {
    return this.tasksRepository.findById(id);
  }

  update(id: string, updateTaskDto: UpdateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.update(id, updateTaskDto, user);
  }

  remove(id: string, user: User): Promise<void> {
    return this.tasksRepository.remove(id, user);
  }
}
