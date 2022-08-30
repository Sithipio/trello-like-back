import { TaskStatus } from '../task-status.model';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetTasksFilterDto {
  @ApiProperty()
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}