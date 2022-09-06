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

  async getBoardById(id: string): Promise<BoardEntity> {
    const found = await this.boardsRepository.findOneBy({ id: id });
    if (!found) {
      throw new NotFoundException((`Board with ID: "${id}" not found`));
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

  async deleteBoard(id: string): Promise<void> {
    const result = await this.boardsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Board with ID: "${id}" not found`);
    }
  }

  async updateBoardIsFavorite(id: string, putBoard: IPutBoard): Promise<BoardEntity> {
    let board = await this.getBoardById(id);
    putBoard.isFavorite = !board.isFavorite;

    return await this.boardsRepository.save({ ...board, ...putBoard });
  }

  async updateBoard(id: string, postPatchBoard: IPostPatchBoard): Promise<BoardEntity> {
    const board = await this.getBoardById(id);

    return await this.boardsRepository.save({ ...board, ...postPatchBoard });
  }

}
