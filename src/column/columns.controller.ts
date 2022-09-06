import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ColumnsService } from './columns.service';
import { ColumnEntity } from './column.entity';
import { PostPatchColumnDto, PutColumnDto } from './dto';


@Controller('column/:id')
@UseGuards(AuthGuard())
export class ColumnsController {
  private logger = new Logger('ColumnsController', { timestamp: true });

  constructor(private columnService: ColumnsService) {
  }

  @Get()
  getColumnsByBoardId(@Param('id') id: string): Promise<ColumnEntity[]> {
    this.logger.verbose(`User retrieving all columns`);
    return this.columnService.getColumnsByBoardId(id);
  }

  @Post()
  createColumn(
    @Param('id') id: string,
    @Body() postColumnDto: PostPatchColumnDto,
  ): Promise<ColumnEntity> {
    this.logger.verbose(`User create a column "${postColumnDto.name}"`);
    return this.columnService.createColumn(id, postColumnDto);
  }

  @Delete('/:id')
  deleteColumn(@Param('id') id: string): Promise<void> {
    this.logger.verbose(`User deleted a column with ID: "${id}"`);
    return this.columnService.deleteColumn(id);
  }

  @Patch('/:id')
  updateColumn(
    @Param('id') id: string,
    @Body() postPatchColumnDto: PostPatchColumnDto,
  ): Promise<ColumnEntity> {
    this.logger.verbose(`User update a column with ID: "${id}"`);
    return this.columnService.updateColumn(id, postPatchColumnDto);
  }

  @Put()
  updateBoardIsFavorite(
    @Param('id') id: string,
    @Body() putColumnDto: PutColumnDto[],
  ): Promise<void> {
    this.logger.verbose(`User drag adn drop column in board with ID: "${id}`);
    return this.columnService.updateColumnOrder(id, putColumnDto);
  }

}
