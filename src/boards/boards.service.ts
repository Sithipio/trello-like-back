import { Injectable } from '@nestjs/common';
import { BoardEntity } from "./board.entity";
@Injectable()
export class BoardsService {
  constructor(
  ) {}

  getBoards(boards: any) {
    return this.getBoards(boards);
  }

  async getAllBoard(): Promise<BoardEntity[]> {
    return;
  }


}
