import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class PostTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
