import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TasksService } from './tasks.service';
import { GetTasksFilterDto, UpdateTaskStatusDto } from './dto';
import { TaskEntity } from './task.entity';
import { GetUser } from '../auth/get-user.decorator';
import { UserEntity } from '../user/user.entity';
import { URL_TASK } from '../routes.constant';

@Controller('/:columnId' + URL_TASK)
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController', { timestamp: true });

  constructor(private tasksService: TasksService) {
  }

  @Get()
  getTaskById(@Param('columnId') columnId: string): Promise<TaskEntity[]> {
    return this.tasksService.getTasksByColumnId(columnId);
  }

  @Get('/:id')
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
    this.logger.verbose(`User retrieving all task Filters: ${JSON.stringify(filterDto)}`)
    return this.tasksService.getTasks(filterDto);
  }

  @Post()
  createTask(
    @Body('name') name: string,
    @GetUser() user: UserEntity,
  ): Promise<TaskEntity> {
    this.logger.verbose(`User "${user.email}" create a task "${name}"`)
    return this.tasksService.createTask(name, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<TaskEntity> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }

}
