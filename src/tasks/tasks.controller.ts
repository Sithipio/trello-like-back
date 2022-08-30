import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../user/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController', { timestamp: true });

  constructor(private tasksService: TasksService) {
  }

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    this.logger.verbose(`User retrieving all task Filters: ${JSON.stringify(filterDto)}`)
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/:taskId')
  getTaskById(@Param('taskId') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(
    @Body('taskName') name: string,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(`User "${user.email}" create a task "${name}"`)
    return this.tasksService.createTask(name, user);
  }

  @Delete('/:taskId')
  deleteTask(@Param('taskId') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:taskId/status')
  updateTaskStatus(
    @Param('taskId') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }

}
