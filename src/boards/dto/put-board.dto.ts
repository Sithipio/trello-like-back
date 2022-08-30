import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PutBoardDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isFavorite: boolean;
}
