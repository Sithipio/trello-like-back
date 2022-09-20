import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskNameDto {
  @ApiProperty()
  @IsString()
  name: string;
}
