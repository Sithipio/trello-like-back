import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';


@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.tasksRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.taskStatus = :status', { status });
    }
    if (search) {
      query.andWhere(
        'LOWER(task.taskName) LIKE LOWER(:search) OR LOWER(task.taskDesc) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    return await query.getMany();
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOneBy({ taskId: id });

    if (!found) {
      throw new NotFoundException((`Task with "${id}" not found`));
    }

    return found;
  }

  async createTask(name: string): Promise<Task> {
    const task = this.tasksRepository.create({
      taskName: name,
      taskStatus: TaskStatus.ACTIVE,
    });

    await this.tasksRepository.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with "${id}" not found`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.taskStatus = status;

    await this.tasksRepository.save(task);
    return task;
  }

}

