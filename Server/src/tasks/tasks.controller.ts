import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../authorization/jwt-auth.guard';

@Controller('tasks')
@ApiTags('Task controller')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @ApiOperation({ summary: 'Create task' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Post(':id?')
  async create(
    @Body() task: Task,
    @Headers('authorization') token: string,
    @Param('id') id?: string,
  ) {
    return this.taskService.createTask(task, token, id);
  }

  @ApiOperation({ summary: 'Delete task' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Headers('authorization') token: string,
  ) {
    return this.taskService.deleteTask(id, token);
  }

  @ApiOperation({ summary: 'Get user tasks' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserTasks(
    @Headers('authorization') token: string,
    @Query('sort') sortParams: string,
  ) {
    const params = sortParams ? sortParams : '';

    return this.taskService.getUserTasks(token, params);
  }

  @ApiOperation({ summary: 'Edit task' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async editTask(
    @Headers('authorization') token: string,
    @Body() task: Task,
    @Param('id') id: string,
  ) {
    return this.taskService.editTask(token, task, id);
  }
}
