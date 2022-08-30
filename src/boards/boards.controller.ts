import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { PostBoardDto } from './dto/create-board.dto';
import { PatchBoardDto } from './dto/patch-board.dto';
import { AuthGuard } from '@nestjs/passport';
import { PutBoardDto } from './dto/put-board.dto';


@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('BoardsController', { timestamp: true });

  constructor(private boardsService: BoardsService) {
  }

  @Get()
  getBoards(): Promise<Board[]> {
    this.logger.verbose(`User retrieving all boards`);
    return this.boardsService.getBoards();
  }

  @Get('/:id')
  getBoardsById(@Param('id') id: string): Promise<Board> {
    this.logger.verbose(`User retrieving a board with ID: "${id}"`);
    return this.boardsService.getBoardById(id);
  }

  @Post()
  createBoard(
    @Body() postBoardDto: PostBoardDto,
  ): Promise<Board> {
    this.logger.verbose(`User create a board "${postBoardDto.name}" with board background "${postBoardDto.background}"`);
    return this.boardsService.createBoard(postBoardDto);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): Promise<void> {
    this.logger.verbose(`User deleted a board with ID: "${id}"`);
    return this.boardsService.deleteBoard(id);
  }

  @Put('/:id')
  updateBoardIsFavorite(
    @Param('id') id: string,
    @Body() putBoardDto: PutBoardDto,
  ): Promise<Board> {
    this.logger.verbose(`User toggle a board favorite status with ID:${id} to ${putBoardDto.isFavorite}.`);
    return this.boardsService.updateBoardIsFavorite(id, putBoardDto);
  }

  @Patch('/:id')
  updateBoard(
    @Param('id') id: string,
    @Body() patchBoardDto: PatchBoardDto,
  ): Promise<Board> {
    this.logger.verbose(`User change a board with ID: "${id}"`);
    return this.boardsService.updateBoard(id, patchBoardDto);
  }

}
