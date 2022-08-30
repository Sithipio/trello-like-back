import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BoardBackground } from '../board-background.model';

export class PatchBoardDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(BoardBackground)
  background: BoardBackground;
}
