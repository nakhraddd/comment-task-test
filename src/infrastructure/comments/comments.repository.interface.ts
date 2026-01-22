import { Comment } from '../../domain/entities/comment.entity';
import { CreateCommentDto } from '../../components/comments/dto/create-comment.dto';
import { UpdateCommentDto } from '../../components/comments/dto/update-comment.dto';
import { User } from '../../domain/entities/user.entity';

export const ICommentRepository = 'ICommentRepository';

export interface ICommentRepository {
  create(createCommentDto: CreateCommentDto, user: User): Promise<Comment>;
  findAll(taskId: string): Promise<Comment[]>;
  findById(id: string): Promise<Comment | null>;
  update(id: string, updateCommentDto: UpdateCommentDto, user: User): Promise<Comment>;
  remove(id: string, user: User): Promise<void>;
}
