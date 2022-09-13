import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ColumnsService } from './columns.service';
import { ColumnEntity } from './column.entity';
import { PostPatchColumnDto, PutColumnDto } from './dto';
import { URL_COLUMN } from '../routes.constant';

@Controller('/:boardId' + URL_COLUMN)
@UseGuards(AuthGuard())
export class ColumnsController {
  private logger = new Logger('ColumnsController', { timestamp: true });

  constructor(private columnService: ColumnsService) {
  }

  @Get()
  getColumnsByBoardId(@Param('boardId') boardId: string): Promise<ColumnEntity[]> {
    this.logger.verbose(`User retrieving all columns from board with ID : ${boardId}`);
    return this.columnService.getColumnsByBoardId(boardId);
  }

  @Post()
  createColumn(
    @Param('boardId') boardId: string,
    @Body() postColumnDto: PostPatchColumnDto,
  ): Promise<ColumnEntity> {
    this.logger.verbose(`User create a column "${postColumnDto.name}"`);
    return this.columnService.createColumn(boardId, postColumnDto);
  }

  @Delete('/:columnId')
  deleteColumn(@Param('columnId') columnId: string): Promise<void> {
    this.logger.verbose(`User deleted a column with ID: "${columnId}"`);
    return this.columnService.deleteColumn(columnId);
  }

  @Patch('/:columnId')
  updateColumn(
    @Param('columnId') columnId: string,
    @Body() postPatchColumnDto: PostPatchColumnDto,
  ): Promise<ColumnEntity> {
    this.logger.verbose(`User update a column with ID: "${columnId}"`);
    return this.columnService.updateColumn(columnId, postPatchColumnDto);
  }

  @Put()
  updateColumnOrder(
    @Param('boardId') boardId: string,
    @Body() putColumnDto: PutColumnDto[],
  ): Promise<void> {
    this.logger.verbose(`User drag and drop column in board with ID: "${boardId}`);
    return this.columnService.updateColumnOrder(putColumnDto);
  }

}
