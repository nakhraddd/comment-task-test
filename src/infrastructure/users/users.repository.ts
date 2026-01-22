import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../../components/users/dto/create-user.dto';
import { UpdateUserDto } from '../../components/users/dto/update-user.dto';
import { IUserRepository } from './users.repository.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOneBy({ username: createUserDto.username });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const user = this.usersRepository.create(createUserDto);
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    this.usersRepository.merge(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async updateRefreshToken(id: string, refreshToken: string | null): Promise<void> {
    const user = await this.findById(id);
    if (refreshToken) {
      user.refreshToken = await bcrypt.hash(refreshToken, 10);
    } else {
      user.refreshToken = null;
    }
    await this.usersRepository.save(user);
  }
}
