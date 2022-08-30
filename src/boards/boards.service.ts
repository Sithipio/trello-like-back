import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostBoardDto } from './dto/create-board.dto';
import { PatchBoardDto } from './dto/patch-board.dto';
import { PutBoardDto } from './dto/put-board.dto';

@Injectable()
export class BoardsService {

  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {
  }

  async getBoards(): Promise<Board[]> {
    return await this.boardsRepository.find({order: {createDate: 'DESC'}});
  }

  async getBoardById(id: string): Promise<Board> {
    const found = await this.boardsRepository.findOneBy({ id: id });
    if (!found) {
      throw new NotFoundException((`Board with ID: "${id}" not found`));
    }

    return found;
  }

  async createBoard(postBoardDto: PostBoardDto): Promise<Board> {
    const board = this.boardsRepository.create({
      ...postBoardDto,
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

  async updateBoardIsFavorite(id: string, putBoardDto: PutBoardDto): Promise<Board> {
    let board = await this.getBoardById(id);
    putBoardDto.isFavorite = !board.isFavorite;

    return await this.boardsRepository.save({ ...board, ...putBoardDto });
  }

  async updateBoard(id: string, patchBoardDto: PatchBoardDto): Promise<Board> {
    let board = await this.getBoardById(id);

    return await this.boardsRepository.save({ ...board, ...patchBoardDto });
  }

}
