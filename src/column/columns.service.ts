import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ColumnEntity } from './column.entity';
import { IPostPatchColumn } from './interfaces';
import { IPutColumn } from './interfaces';

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
    const found = await this.columnRepository.find({
      where: { id: columnId },
      relations: ['task'],
    });

    if (!found) {
      throw new NotFoundException((`Column with ID: "${columnId}" not found`));
    }

    if (found[0].task.length === 0) {
      await this.columnRepository.delete(columnId);
    } else {
      throw new UnprocessableEntityException('The column cannot be deleted because it contains a tasks');
    }
  }

  async updateColumn(columnId: string, postPatchColumn: IPostPatchColumn): Promise<ColumnEntity> {
    const column = await this.getColumnById(columnId);

    return await this.columnRepository.save({ ...column, ...postPatchColumn });
  }

  async updateColumnOrder(putBoard: IPutColumn[]): Promise<void> {
    await Promise.all(
      putBoard.map((item, i) => {
          item.order = i + 1;
          return this.columnRepository.save(item);
        },
      ),
    );
  }
}
