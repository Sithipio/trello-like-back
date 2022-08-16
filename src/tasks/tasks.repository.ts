import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { Repository } from "typeorm";
import { TaskStatus } from "./task-status.model";

//Not usage

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {
  }

  async createTask(taskName: string): Promise<Task> {
    const task = this.taskRepository.create({
      taskName,
      taskStatus: TaskStatus.ACTIVE
    });
    await this.taskRepository.save(task);
    return task;

  }
}
 