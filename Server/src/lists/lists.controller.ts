import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ListsService } from './lists.service';
import { JwtAuthGuard } from '../authorization/jwt-auth.guard';
import { List } from './lists.model';

@Controller('lists')
@ApiTags('Lists controller')
export class ListsController {
  constructor(private listService: ListsService) {}

  @ApiOperation({ summary: 'Create list' })
  @ApiResponse({ status: 200, type: List })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() ListDto, @Headers('authorization') token: string) {
    return this.listService.createList(ListDto, token);
  }

  @ApiOperation({ summary: 'Get lists' })
  @ApiResponse({ status: 200, type: List })
  @UseGuards(JwtAuthGuard)
  @Get()
  getLists(@Headers('authorization') token: string) {
    return this.listService.getLists(token);
  }

  @ApiOperation({ summary: 'Get list and tasks' })
  @ApiResponse({ status: 200, type: List })
  @UseGuards(JwtAuthGuard)
  @Get('tasks')
  getListsAndTasks(@Headers('authorization') token: string) {
    return this.listService.getListsAndTasks(token);
  }

  @ApiOperation({ summary: 'Get list by id' })
  @ApiResponse({ status: 200, type: List })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getListById(
    @Param('id') id: string,
    @Headers('authorization') token: string,
    @Query('sort') sortParams: string,
  ) {
    const params = sortParams ? sortParams : '';
    return this.listService.getListById(id, token, params);
  }

  @ApiOperation({ summary: 'Delete list' })
  @ApiResponse({ status: 200, type: List })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteList(@Param('id') id: string, @Headers('authorization') token: string) {
    return this.listService.deleteList(id, token);
  }

  @ApiOperation({ summary: 'Edit list' })
  @ApiResponse({ status: 200, type: List })
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  editList(
    @Body() ListDto,
    @Param('id') id: string,
    @Headers('authorization') token: string,
  ) {
    return this.listService.editList(id, ListDto, token);
  }
}
