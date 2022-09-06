import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { BoardEntity } from './board.entity';
import { BoardsService } from './boards.service';
import { PutBoardDto, PostPatchBoardDto } from './dto';
import { AppRoutes } from '../app-routes';


@Controller(AppRoutes.BOARD)
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('BoardsController', { timestamp: true });

  constructor(private boardsService: BoardsService) {
  }

  @Get()
  getBoards(): Promise<BoardEntity[]> {
    this.logger.verbose(`User retrieving all boards`);
    return this.boardsService.getBoards();
  }

  @Get('/:id')
  getBoardsById(@Param('id') id: string): Promise<BoardEntity> {
    this.logger.verbose(`User retrieving a board with ID: "${id}"`);
    return this.boardsService.getBoardById(id);
  }

  @Post()
  createBoard(
    @Body() postPatchBoardDto: PostPatchBoardDto,
  ): Promise<BoardEntity> {
    this.logger.verbose(`User create a board "${postPatchBoardDto.name}" with board background "${postPatchBoardDto.background}"`);
    return this.boardsService.createBoard(postPatchBoardDto);
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
  ): Promise<BoardEntity> {
    this.logger.verbose(`User toggle a board favorite status with ID:${id} to ${putBoardDto.isFavorite}.`);
    return this.boardsService.updateBoardIsFavorite(id, putBoardDto);
  }

  @Patch('/:id')
  updateBoard(
    @Param('id') id: string,
    @Body() postPatchBoardDto: PostPatchBoardDto,
  ): Promise<BoardEntity> {
    this.logger.verbose(`User update a board with ID: "${id}"`);
    return this.boardsService.updateBoard(id, postPatchBoardDto);
  }

}
