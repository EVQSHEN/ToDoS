import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  CreatedAt,
  HasMany,
} from 'sequelize-typescript';
import { Task } from 'src/tasks/tasks.model';

interface ListCreationAttribute {
  name: string;
  color: string;
}

@Table({ tableName: 'list' })
export class List extends Model<List, ListCreationAttribute> {
  @ApiProperty({ example: '12' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'create dev server' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: '1' })
  @Column({ type: DataType.STRING, allowNull: false })
  userId: string;

  @ApiProperty({ example: '2' })
  @Column({ type: DataType.STRING, allowNull: false })
  color: string;

  @CreatedAt
  createdAt: Date;

  @HasMany(() => Task)
  tasks: Task[];
}
