import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskBackground } from '../enums';

export class UpdateTaskBackgroundDto {
  @ApiProperty()
  @IsString()
  background: TaskBackground;
}
