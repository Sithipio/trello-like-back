import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TaskBackground, TaskStatus } from './enums';
import { TaskEntity } from './task.entity';
import { IPostTask, IPutTask } from './interfaces';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {
  }

  async getTasksByBoardId(boardId: string): Promise<TaskEntity[]> {
    return await this.tasksRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.column', 'column')
      .select([
        'task.id AS id',
        'task.name AS name',
        'task.description AS description',
        'task.background AS background',
        'task.date AS date',
        'task.userId AS user',
        'task.order AS order',
        'task.status AS status',
      ])
      .addSelect('column.id', 'column')
      .where('task.board = :id', { id: boardId })
      .orderBy('task.order', 'ASC')
      .getRawMany();
  }

/*  async getTasksByBoardId(boardId: string): Promise<TaskEntity[]> {
   return  await this.tasksRepository.find({
     relations: ['tag'],
     where: {
       board: {
         id: boardId,
       }
     },
      loadRelationIds:
        { relations: ['column', 'board']},

    });

  }*/

  /*  async getTaskById(taskId: string): Promise<TaskEntity> {
      return await this.tasksRepository
        .createQueryBuilder('task')
        .leftJoinAndSelect('task.column', 'column')
        .select([
          'task.id AS id',
          'task.name AS name',
          'task.description AS description',
          'task.background AS background',
          'task.date AS date',
          'task.userId AS user',
          'task.order AS order',
          'task.status AS status',
        ])
        .addSelect('column.id', 'columnId')
        .where('task.id = :id', { id: taskId })
        .getRawOne();
    }*/

  async getTaskById(taskId: string): Promise<TaskEntity> {
    const found = await this.tasksRepository.find({
      where: { id: taskId },
      relations: ['tag'],
      loadRelationIds:
        { relations: ['column']},
    });
    return found.find(item => item);
  }

  async createTask(boardId, columnId, user, postTask: IPostTask): Promise<TaskEntity> {
    const count = await this.tasksRepository
      .createQueryBuilder('task')
      .where('task.board = :id', { id: boardId })
      .select('MAX("order")')
      .getRawOne();

    const task = this.tasksRepository.create({
      ...postTask,
      board: boardId,
      column: columnId,
      status: TaskStatus.ACTIVE,
      order: count.max + 1,
      background: TaskBackground.EMPTY,
    });

    return await this.tasksRepository.save(task);
  }

  async updateTaskOrder(putTask: IPutTask[]): Promise<void> {
    await Promise.all(
      putTask.map(async (item, i) => {
          await this.tasksRepository
            .createQueryBuilder('task')
            .update()
            .set({
              order: i + 1,
              column: {
                id: item.columnId,
              },
            })
            .where('id = :id', { id: item.id })
            .execute();
        },
      ),
    );
  }

  async updateTask(taskId: string, newData: {}): Promise<TaskEntity> {
    const task = await this.getTaskById(taskId);

    return this.tasksRepository.save({ ...task, ...newData });
  }

/*  async getTagsByTaskID(taskId: string): Promise<TaskEntity[]> {
    return await this.tasksRepository.createQueryBuilder('task')
      .leftJoinAndSelect('task.tag', 'tag')
      .where('task.id = :id', { id: taskId })
      .getMany();
  }*/


  /*async getTasks(filter: IGetTasksFilter): Promise<TaskEntity[]> {
    const { status, search } = filter;
    const query = this.tasksRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.taskStatus = :status', { status });
    }
    if (search) {
      query.andWhere(
        //todo ILIKE
        '(LOWER(task.taskName) LIKE LOWER(:search) OR LOWER(task.taskDesc) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    try {
      return await query.getMany();
    } catch (error) {
      this.logger.error(`Failed to get task for user with filter: ${JSON.stringify(filter)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }*/

  /* async getTasksByColumnId(columnId: string): Promise<TaskEntity[]> {
     return await this.tasksRepository
       .createQueryBuilder('task')
       .where('task.column = :id', { id: columnId })
       .getMany();
   }*/

  //todo Перший метод
  /*
     async getTasksByColumnId(boardId: string): Promise<TaskEntity[]> {
      return await this.tasksRepository
        .createQueryBuilder('task')
        .leftJoinAndSelect('task.column', 'column')
        .select('task')
        .addSelect('column.id')
        .where('task.board = :id', { id: boardId })
        .getMany();
    }
  */

  /*  async getTasksByColumnId(columnIds: string): Promise<TaskEntity[]> {
      return await this.tasksRepository
        .createQueryBuilder('task')
        .where('task.column IN (:...columnIds)', { columnIds })
        .getMany();
    }*/

  /*    async getTasksByColumnId(columnId: string): Promise<TaskEntity[]> {
        return await this.tasksRepository.find(
          {
            select: {
              id: true,
              name: true,
              tag: true,
              background: true,
              order: true,
            },
            loadRelationIds: true,
            //todo з relations дістає column об'єкт
            relations: { column: true },
            where: {
              column: {
                id: columnId,
              },
            },
          },
        );
      }*/

  /* async getTaskById(id: string): Promise<TaskEntity> {
     const found = await this.tasksRepository.findOneBy({ id: id });

     if (!found) {
       throw new NotFoundException((`Task with ID: "${id}" not found`));
     }

     return found;
   }*/

  /*  async getTasksById(boardId: string): Promise<TaskEntity[]> {
      return await this.tasksRepository
        .createQueryBuilder('task')
        .leftJoinAndSelect('task.column', 'column')
        .leftJoinAndSelect('task.board', 'board')
        .select([
          'task.id AS id',
          'task.name AS name',
          'task.description AS description',
          'task.background AS background',
          'task.tag AS tag',
          'task.date AS date',
          'task.userId AS user',
          'task.order AS order',
          'task.status AS status',
        ])
        .addSelect('column.id', 'columnId')
        .addSelect('board.id', 'boardId')
        .where('task.board = :id', { id: boardId })
        .orderBy('task.order', 'DESC')
        .getRawMany();
    }*/

  /*  async deleteTask(id: string): Promise<void> {
      const result = await this.tasksRepository.delete(id);

      if (result.affected === 0) {
        throw new NotFoundException(`Task with ID: "${id}" not found`);
      }
    }
*/

  /*
    async updateTaskStatus(id: string, status: TaskStatus): Promise<TaskEntity> {
      const task = await this.getTaskById(id);
      task.status = status;

      await this.tasksRepository.save(task);
      return task;
    }*/
}

