import { Task } from '../../domain/entities/task.entity';
import { CreateTaskDto } from '../../components/tasks/dto/create-task.dto';
import { UpdateTaskDto } from '../../components/tasks/dto/update-task.dto';
import { User } from '../../domain/entities/user.entity';

export const ITaskRepository = 'ITaskRepository';

export interface ITaskRepository {
  create(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
  findAll(): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  update(id: string, updateTaskDto: UpdateTaskDto, user: User): Promise<Task>;
  remove(id: string, user: User): Promise<void>;
}
