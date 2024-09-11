import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './tasks.model';
import { InjectModel } from '@nestjs/sequelize';
import { AuthorizationService } from 'src/authorization/authorization.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private taskRepository: typeof Task,
    private authService: AuthorizationService,
  ) {}

  async createTask(dto: Task, token: string, id: string | undefined) {
    const user = await this.authService.getUserFromToken(token);
    dto.userId = user.id;

    if (id) {
      dto.listId = Number(id);
    }

    if (dto.userId === user.id) {
      const task = await this.taskRepository.create(dto);
      return task;
    } else {
      throw new NotFoundException('You are not authorized');
    }
  }

  async getUserTasks(token: string, params: string) {
    const user = await this.authService.getUserFromToken(token);

    const filter: any = {
      where: { userId: user.id },
      order: [['createdAt', 'DESC']],
    };

    switch (params) {
      case 'today':
        filter.where.date = new Date().toISOString().split('T')[0];
        break;
      case 'completed':
        filter.where.is_completed = true;
        break;
      case 'not_completed':
        filter.where.is_completed = false;
        break;
      case 'date_asc':
        filter.order = [['date', 'ASC']];
        break;
      case 'date_desc':
        filter.order = [['date', 'DESC']];
        break;
    }

    const task = await this.taskRepository.findAll({
      ...filter,
    });

    if (!task) {
      throw new NotFoundException('Task not found or you are not authorized');
    }

    return task;
  }

  async deleteTask(taskId: string, token: string) {
    const user = await this.authService.getUserFromToken(token);

    const task = await this.taskRepository.findOne({
      where: { userId: user.id, id: taskId },
    });

    if (task) {
      await task.destroy();
      return task;
    } else {
      throw new NotFoundException(
        'Task not found or you are not authorized to delete this task',
      );
    }
  }

  async editTask(token: string, task: Task, id: string) {
    const user = await this.authService.getUserFromToken(token);

    const verify = await this.taskRepository.findOne({
      where: { userId: user.id, id: id },
    });

    if (verify) {
      await this.taskRepository.update(task, { where: { id } });
      return task;
    } else {
      throw new NotFoundException(
        'Task not found or you are not authorized to edit this task',
      );
    }
  }
}
