import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthorizationService } from 'src/authorization/authorization.service';
import { List } from './lists.model';
import { UserDto } from 'src/users/dto/user.dto';
import { ListDto } from './dto/list.dto';
import { Task } from 'src/tasks/tasks.model';

@Injectable()
export class ListsService {
  constructor(
    @InjectModel(List) private listRepository: typeof List,
    @InjectModel(Task) private taskRepository: typeof Task,
    private authService: AuthorizationService,
  ) {}

  async createList(dto: List, token: string) {
    const user = await this.authService.getUserFromToken(token);

    const userId = user.id.toString();
    const existingList = await this.listRepository.findOne({
      where: { userId: userId, name: dto.name },
    });

    if (existingList) {
      throw new NotFoundException('List alredy exists');
    }

    const dtoUpdate = { ...dto, userId: user.id.toString() };
    const task = await this.listRepository.create(dtoUpdate);

    return task;
  }

  async getLists(token: string) {
    const user = await this.authService.getUserFromToken(token);

    const task = await this.listRepository.findAll({
      order: [['createdAt', 'ASC']],
    });
    const taskFilter = task.filter((el) => el.userId == user.id);

    return taskFilter;
  }

  async getListsAndTasks(token: string) {
    const user = await this.authService.getUserFromToken(token);

    const task = await this.listRepository.findAll({
      include: { all: true },
      order: [['createdAt', 'DESC']],
    });
    const taskFilter = task.filter((el) => el.userId == user.id);

    return taskFilter;
  }

  async getListById(id: string, token: string, params: string) {
    const user = await this.authService.getUserFromToken(token);

    const filter: any = {
      where: {},
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

    const lists = await this.listRepository.findAll({
      where: { userId: user.id.toString(), id },
      include: {
        model: this.taskRepository,
        as: 'tasks',
        ...filter,
      },
      order: [['createdAt', 'DESC']],
    });

    return lists[0]?.tasks || [];
  }

  async deleteList(id: string, token: string) {
    const user = await this.authService.getUserFromToken(token);

    const list = await this.listRepository.findOne({
      where: { userId: user.id.toString(), id },
      include: { all: true },
    });

    if (!list) {
      throw new NotFoundException(
        'List not found or you are not authorized to delete this list',
      );
    }

    const relatedTasks = list.tasks;

    if (relatedTasks.length > 0) {
      await Promise.all(relatedTasks.map((task) => task.destroy()));
    }

    await list.destroy();
  }

  async editList(id: string, dto: ListDto, token: string) {
    const user = await this.authService.getUserFromToken(token);

    const list = await this.listRepository.findOne({
      where: { userId: user.id.toString(), id },
    });

    if (list) {
      list.name = dto.name;
      list.color = dto.color;
      await list.save();
      return list;
    } else throw new NotFoundException('List not found');
  }
}
