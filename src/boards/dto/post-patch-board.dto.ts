import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { BoardBackground } from '../board-background.model';
import { ApiProperty } from '@nestjs/swagger';

export class PostPatchBoardDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(BoardBackground)
  background: BoardBackground;
}
