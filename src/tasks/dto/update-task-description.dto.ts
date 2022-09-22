import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDescriptionDto {
  @ApiProperty()
  @IsString()
  description: string;
}
