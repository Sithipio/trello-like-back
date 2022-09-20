import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { BoardEntity } from './board.entity';
import { BoardsService } from './boards.service';
import { PutBoardDto, PostPatchBoardDto } from './dto';
import { URL_BOARD } from '../routes.constant';


@Controller(URL_BOARD)
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

  @Get('/:boardId')
  getBoardsById(@Param('boardId') boardId: string): Promise<BoardEntity> {
    this.logger.verbose(`User retrieving a board with ID: "${boardId}"`);
    return this.boardsService.getBoardById(boardId);
  }

  @Post()
  createBoard(
    @Body() postPatchBoardDto: PostPatchBoardDto,
  ): Promise<BoardEntity> {
    this.logger.verbose(`User create a board "${postPatchBoardDto.name}" with board background "${postPatchBoardDto.background}"`);
    return this.boardsService.createBoard(postPatchBoardDto);
  }

  @Delete('/:boardId')
  deleteBoard(@Param('boardId') boardId: string): Promise<void> {
    this.logger.verbose(`User deleted a board with ID: "${boardId}"`);
    return this.boardsService.deleteBoard(boardId);
  }

  @Patch('/:boardId')
  updateBoard(
    @Param('boardId') boardId: string,
    @Body() postPatchBoardDto: PostPatchBoardDto,
  ): Promise<BoardEntity> {
    this.logger.verbose(`User update a board with ID: "${boardId}"`);
    return this.boardsService.updateBoard(boardId, postPatchBoardDto);
  }

  @Put('/:boardId')
  updateBoardIsFavorite(
    @Param('boardId') boardId: string,
    @Body() putBoardDto: PutBoardDto,
  ): Promise<BoardEntity> {
    this.logger.verbose(`User toggle a board favorite status with ID:${boardId} to ${putBoardDto.isFavorite}.`);
    return this.boardsService.updateBoardIsFavorite(boardId, putBoardDto);
  }

}
