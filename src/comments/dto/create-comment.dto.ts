import { IsString, Length, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  @Length(1, 1000)
  text: string;

  @ApiProperty()
  @IsUUID()
  task_id: string;
}
