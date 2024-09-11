import { Module, forwardRef } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { User } from 'src/users/users.model';
import { Task } from './tasks.model';
import { List } from 'src/lists/lists.model';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    SequelizeModule.forFeature([User, Task, List]),
    forwardRef(() => AuthorizationModule),
  ],
})
export class TasksModule {}
