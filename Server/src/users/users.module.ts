import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { Task } from 'src/tasks/tasks.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Task]),
    forwardRef(() => AuthorizationModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
