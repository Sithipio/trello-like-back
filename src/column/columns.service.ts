import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ColumnEntity } from './column.entity';
import { IPostPatchColumn } from './interfaces';
import { IPutColumn } from './interfaces/put-column.interfase';

@Injectable()
export class ColumnsService {

  constructor(
    @InjectRepository(ColumnEntity)
    private columnRepository: Repository<ColumnEntity>,
  ) {
  }

  async getColumnsByBoardId(boardId: string): Promise<ColumnEntity[]> {
    return await this.columnRepository
      .createQueryBuilder('column')
      .where('column.board = :id', { id: boardId })
      .orderBy('column.order', 'ASC')
      .getMany();
  }

  async getColumnById(id: string): Promise<ColumnEntity> {
    const found = await this.columnRepository.findOneBy({ id: id });
    if (!found) {
      throw new NotFoundException((`Column with ID: "${id}" not found`));
    }

    return found;
  }

  async createColumn(boardId, postColumn: IPostPatchColumn): Promise<ColumnEntity> {
    const count = await this.columnRepository
      .createQueryBuilder('column')
      .where('column.board = :id', { id: boardId })
      .select('MAX("order")')
      .getRawOne();

    const column = this.columnRepository.create({
      ...postColumn,
      board: boardId,
      order: count.max + 1,
    });

    return await this.columnRepository.save(column);
  }

  async deleteColumn(columnId: string): Promise<void> {
    const result = await this.columnRepository.delete(columnId);

    if (result.affected === 0) {
      throw new NotFoundException(`Column with ID: "${columnId}" not found`);
    }
  }

  async updateColumn(columnId: string, postPatchColumn: IPostPatchColumn): Promise<ColumnEntity> {
    const column = await this.getColumnById(columnId);

    return await this.columnRepository.save({ ...column, ...postPatchColumn });
  }

  async updateColumnOrder(boardId: string, putBoard: IPutColumn[]): Promise<void> {
    putBoard.map((item, i) => {
        item.order = i;
        return this.columnRepository.save(item);
      },
    );
  }
}
