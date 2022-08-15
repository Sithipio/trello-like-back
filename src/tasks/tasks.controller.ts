import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskStatus } from "./task-status.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { Task } from "./task.entity";

@Controller("/tasks")

export class TasksController {
  constructor(private tasksService: TasksService) {
  }

  @Get("/:taskId")
  getTaskById(@Param("taskId") taskId: string): Promise<Task> {
    return this.tasksService.getTaskById(taskId);
  }

  @Post()
  createTask(@Body('taskName') taskName: string): Promise<Task> {
    return this.tasksService.createTask(taskName);
  }


/*  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTaskWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }





  @Delete("/:id")
  deleteTask(@Param("id") id: string): void {
    return this.tasksService.deleteTask(id);
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id") id: string,
    @Body() UpdateTaskStatusDto: UpdateTaskStatusDto
  ): Task {
    const { status } = UpdateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }*/
}
