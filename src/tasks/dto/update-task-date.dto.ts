import { IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDateDto {
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  date: Date | null;
}
