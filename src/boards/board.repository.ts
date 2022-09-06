import { Injectable } from '@nestjs/common';

import { RepositoryDAO } from '../data-sourse';
import { BoardEntity } from './board.entity';

@Injectable()
export class BoardRepository extends RepositoryDAO<BoardEntity>{

  constructor() {
    super();
  }

  async getBoards(): Promise<BoardEntity[]> {
    const repository = await this._getRepository(BoardEntity);
    console.log(repository);
    return await repository.find( { order: { createDate: 'DESC' } });
  }

  /*  async getBoardById(id: string): Promise<Board> {
      const found = await this.findOneBy({ id: id });
      if (!found) {
        throw new NotFoundException((`Board with ID: "${id}" not found`));
      }

      return found;
    }

    async createBoard(postBoardDto: PostBoardDto): Promise<Board> {
      const board = this.create({
        ...postBoardDto,
        createDate: new Date(),
      });

      return await this.save(board);
    }

    async deleteBoard(id: string): Promise<void> {
      const result = await this.delete(id);

      if (result.affected === 0) {
        throw new NotFoundException(`Board with ID: "${id}" not found`);
      }
    }

    async updateBoardIsFavorite(id: string, putBoardDto: PutBoardDto): Promise<Board> {
      let board = await this.getBoardById(id);
      putBoardDto.isFavorite = !board.isFavorite;

      return await this.save({ ...board, ...putBoardDto });
    }

    async updateBoard(id: string, patchBoardDto: PatchBoardDto): Promise<Board> {
      let board = await this.getBoardById(id);

      return await this.save({ ...board, ...patchBoardDto });
    }*/
}
