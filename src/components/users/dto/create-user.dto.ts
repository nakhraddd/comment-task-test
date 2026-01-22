import { IsString, IsOptional, IsIn, IsNotEmpty, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number or special character.',
    example: 'Password123!',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number or special character',
  })
  password?: string;

  @ApiProperty({ enum: ['author', 'user'] })
  @IsString()
  @IsIn(['author', 'user'])
  role: string;
}
