import { TaskStatus } from '../enums';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskStatusDto {
  @ApiProperty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
