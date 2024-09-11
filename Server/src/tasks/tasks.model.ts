import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  CreatedAt,
} from 'sequelize-typescript';
import { List } from 'src/lists/lists.model';
import { User } from 'src/users/users.model';

interface TaskCreationAttribute {
  email: string;
  password: string;
  is_completed: boolean;
  date: string;
  color: string;
  userId: number;
  listId: number;
  createdAt: any;
}

@Table({ tableName: 'task' })
export class Task extends Model<Task, TaskCreationAttribute> {
  @ApiProperty({ example: '1' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'create dev server' })
  @Column({ type: DataType.STRING, allowNull: false })
  task: string;

  @ApiProperty({ example: 'create a nestJS server on port 5000' })
  @Column({ type: DataType.STRING, allowNull: true })
  description: string;

  @ApiProperty({ example: 'Dev' })
  @Column({ type: DataType.STRING, allowNull: true })
  list: string;

  @ApiProperty({ example: '21.02.2024' })
  @Column({ type: DataType.STRING, allowNull: true })
  date: string;

  @ApiProperty({ example: '2' })
  @Column({ type: DataType.STRING })
  color: string;

  @ApiProperty({ example: 'true' })
  @Column({ type: DataType.BOOLEAN })
  is_completed: boolean;

  @CreatedAt
  createdAt: Date;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => List)
  @Column
  listId: number;

  @BelongsTo(() => List)
  listInstance: List;
}
