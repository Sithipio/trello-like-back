import { Body, Controller, Get, Logger, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TasksService } from './tasks.service';
import { PostTaskDto, PutTaskDto } from './dto';
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
  getTaskByBoardId(@Param('boardId') boardId: string): Promise<TaskEntity[]> {
    this.logger.verbose(`User retrieving all tasks from board with ID : ${boardId}`);
    return this.tasksService.getTasksByBoardId(boardId);
  }

  @Post('/:columnId')
  createTask(
    @Param('boardId') boardId: string,
    @Param('columnId') columnId: string,
    @Body() postTaskDto: PostTaskDto,
    @GetUser() user: UserEntity,
  ): Promise<TaskEntity> {
    this.logger.verbose(`User "${user.email}" create a task "${postTaskDto.name}"`)
    return this.tasksService.createTask(postTaskDto, user, boardId, columnId);
  }

  @Put()
  updateTaskOrder(
    @Param('boardId') boardId: string,
    @Body() putTaskDto: PutTaskDto[],
  ): Promise<void> {
    this.logger.verbose(`User drag and drop column in board with ID: "${boardId}`);
    return this.tasksService.updateTaskOrder(putTaskDto);
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
