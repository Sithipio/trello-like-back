import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TaskStatus } from './task-status.model';
import { TaskEntity } from './task.entity';
import { IGetTasksFilter } from './interfaces';

@Injectable()
export class TasksService {
  private logger = new Logger('TasksService', { timestamp: true });

  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {
  }

  async getTasks(filter: IGetTasksFilter): Promise<TaskEntity[]> {
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
  }

  async getTaskById(id: string): Promise<TaskEntity> {
    const found = await this.tasksRepository.findOneBy({ taskId: id });

    if (!found) {
      throw new NotFoundException((`Task with ID: "${id}" not found`));
    }

    return found;
  }

  async createTask(name: string, user: any): Promise<TaskEntity> {
    const task = this.tasksRepository.create({
      taskName: name,
      taskStatus: TaskStatus.ACTIVE,
      taskUser: user,
    });

    await this.tasksRepository.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID: "${id}" not found`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<TaskEntity> {
    const task = await this.getTaskById(id);
    task.taskStatus = status;

    await this.tasksRepository.save(task);
    return task;
  }

}

