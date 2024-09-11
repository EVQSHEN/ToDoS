import { Module, forwardRef } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { Task } from 'src/tasks/tasks.model';
import { List } from './lists.model';

@Module({
  controllers: [ListsController],
  providers: [ListsService],
  imports: [
    SequelizeModule.forFeature([Task, List]),
    forwardRef(() => AuthorizationModule),
  ],
})
export class ListsModule {}
