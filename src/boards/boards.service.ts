import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BoardEntity } from './board.entity';
import { IPostPatchBoard, IPutBoard } from './interfaces';

@Injectable()
export class BoardsService {

  constructor(
    @InjectRepository(BoardEntity)
    private boardsRepository: Repository<BoardEntity>,
  ) {
  }

  async getBoards(): Promise<BoardEntity[]> {
    return await this.boardsRepository.find({ order: { createDate: 'DESC' } });
  }

  async getBoardById(boardId: string): Promise<BoardEntity> {
    const found = await this.boardsRepository.findOneBy({ id: boardId });
    if (!found) {
      throw new NotFoundException((`Board with ID: "${boardId}" not found`));
    }

    return found;
  }

  async createBoard(postPatchBoard: IPostPatchBoard): Promise<BoardEntity> {
    const board = this.boardsRepository.create({
      ...postPatchBoard,
      createDate: new Date(),
    });

    return await this.boardsRepository.save(board);
  }

  async deleteBoard(boardId: string): Promise<void> {
    const result = await this.boardsRepository.delete(boardId);

    if (result.affected === 0) {
      throw new NotFoundException(`Board with ID: "${boardId}" not found`);
    }
  }

  async updateBoardIsFavorite(boardId: string, putBoard: IPutBoard): Promise<BoardEntity> {
    let board = await this.getBoardById(boardId);
    putBoard.isFavorite = !board.isFavorite;

    return await this.boardsRepository.save({ ...board, ...putBoard });
  }

  async updateBoard(boardId: string, postPatchBoard: IPostPatchBoard): Promise<BoardEntity> {
    const board = await this.getBoardById(boardId);

    return await this.boardsRepository.save({ ...board, ...postPatchBoard });
  }

}
