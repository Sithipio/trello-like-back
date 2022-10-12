import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { TagBackground } from '../tag-background.model';

export class PostPatchTagDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEnum(TagBackground)
  background: TagBackground;
}
