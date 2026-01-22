import { IsString, IsOptional, IsUUID, IsIn, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ enum: ['author', 'user'] })
  @IsString()
  @IsIn(['author', 'user'])
  role: string;
}
