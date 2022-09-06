import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostPatchColumnDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
