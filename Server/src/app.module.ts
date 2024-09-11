import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { TasksModule } from './tasks/tasks.module';
import { ListsModule } from './lists/lists.module';
import { User } from './users/users.model';
import { Task } from './tasks/tasks.model';
import { List } from './lists/lists.model';
import pg from 'pg';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env` }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.HOST,
      database: process.env.DATABASE,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      port: 5432,
      models: [User, Task, List],
      autoLoadModels: true,
      dialectModule: pg,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }),

    UsersModule,
    AuthorizationModule,
    TasksModule,
    ListsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
