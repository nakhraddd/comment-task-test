import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../../components/users/dto/create-user.dto';
import { UpdateUserDto } from '../../components/users/dto/update-user.dto';

export const IUserRepository = 'IUserRepository';

export interface IUserRepository {
  create(createUserDto: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
  delete(id: string): Promise<void>;
  updateRefreshToken(id: string, refreshToken: string | null): Promise<void>;
}
