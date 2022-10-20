import { Body, Controller, Get, Logger, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TasksService } from './tasks.service';
import {
  PostTaskDto,
  PutTaskDto,
  UpdateTaskBackgroundDto,
  UpdateTaskDateDto,
  UpdateTaskDescriptionDto,
  UpdateTaskNameDto,
} from './dto';
import { TaskEntity } from './task.entity';
import { GetUser } from '../auth/get-user.decorator';
import { UserEntity } from '../user/user.entity';
import { URL_TASK } from '../routes.constant';

@Controller('/:boardId' + URL_TASK)
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController', { timestamp: true });

  constructor(private tasksService: TasksService) {
  }

  @Get()
  getTasksByBoardId(@Param('boardId') boardId: string): Promise<TaskEntity[]> {
    this.logger.verbose(`User retrieving all tasks from board with ID : ${boardId}`);
    return this.tasksService.getTasksByBoardId(boardId);
  }

  @Get('/:taskId')
  getTaskById(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
  ): Promise<TaskEntity> {
    this.logger.verbose(`User retrieving task with ID : ${taskId} from board with ID : ${boardId}`);
    return this.tasksService.getTaskById(taskId);
  }

/*  @Get('/:taskId/tags')
  getTagsById(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
  ): Promise<TaskEntity[]> {
    this.logger.verbose(`User retrieving task with ID : ${taskId} from board with ID : ${boardId}`);
    return this.tasksService.getTagsByTaskID(taskId);
  }*/

  @Post('/:columnId')
  createTask(
    @Param('boardId') boardId: string,
    @Param('columnId') columnId: string,
    @Body() postTaskDto: PostTaskDto,
    @GetUser() user: UserEntity,
  ): Promise<TaskEntity> {
    this.logger.verbose(`User "${user.email}" create a task "${postTaskDto.name}"`);
    return this.tasksService.createTask(boardId, columnId, user, postTaskDto);
  }

  @Put()
  updateTaskOrder(
    @Param('boardId') boardId: string,
    @Body() putTaskDto: PutTaskDto[],
  ): Promise<void> {
    this.logger.verbose(`User drag and drop column in the board with ID: "${boardId}`);
    return this.tasksService.updateTaskOrder(putTaskDto);
  }

  @Patch('/:taskId/name')
  updateTaskName(
    @Param('taskId') taskId: string,
    @Body() updateTaskNameDto: UpdateTaskNameDto,
  ): Promise<TaskEntity> {
    this.logger.verbose(`User update a name of the task with ID: "${taskId}`);
    return this.tasksService.updateTask(taskId, updateTaskNameDto);
  }

  @Patch('/:taskId/background')
  updateTaskBackground(
    @Param('taskId') taskId: string,
    @Body() updateTaskBackgroundDto: UpdateTaskBackgroundDto,
  ): Promise<TaskEntity> {
    this.logger.verbose(`User update a background of the task with ID: "${taskId}`);
    return this.tasksService.updateTask(taskId, updateTaskBackgroundDto);
  }

  @Patch('/:taskId/description')
  updateTaskDescription(
    @Param('taskId') taskId: string,
    @Body() updateTaskDescriptionDto: UpdateTaskDescriptionDto,
  ): Promise<TaskEntity> {
    this.logger.verbose(`User update a description of the task with ID: "${taskId}`);
    return this.tasksService.updateTask(taskId, updateTaskDescriptionDto);
  }

  @Patch('/:taskId/date')
  updateTaskDate(
    @Param('taskId') taskId: string,
    @Body() updateTaskDateDto: UpdateTaskDateDto,
  ): Promise<TaskEntity> {
    this.logger.verbose(`User update a date of the task with ID: "${taskId}`);
    return this.tasksService.updateTask(taskId, updateTaskDateDto);
  }

  /*@Get('/:id')
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
    this.logger.verbose(`User retrieving all task Filters: ${JSON.stringify(filterDto)}`)
    return this.tasksService.getTasks(filterDto);
  }*/

  /*  @Delete('/:id')
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
    }*/

}
