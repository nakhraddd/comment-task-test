import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../../components/users/dto/create-user.dto';
import { UpdateUserDto } from '../../components/users/dto/update-user.dto';
import { IUserRepository } from './users.repository.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject(IUserRepository)
    private readonly usersRepository: IUserRepository,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.create(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findById(id);
  }

  findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findByUsername(username);
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersRepository.update(id, updateUserDto);
  }

  updateRefreshToken(id: string, refreshToken: string | null): Promise<void> {
    return this.usersRepository.updateRefreshToken(id, refreshToken);
  }

  remove(id: string): Promise<void> {
    return this.usersRepository.delete(id);
  }
}
