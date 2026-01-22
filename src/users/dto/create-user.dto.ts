import { IsString, IsOptional, IsUUID, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ enum: ['author', 'user'] })
  @IsString()
  @IsIn(['author', 'user'])
  role: string;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  task_id?: string;
}
