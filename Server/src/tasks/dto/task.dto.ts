import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty({ example: 'create dev server' })
  readonly task: string;
  @ApiProperty({ example: 'create a nestJS server on port 5000' })
  readonly description: string;
  @ApiProperty({ example: '21.02.2024' })
  readonly date: string;
  @ApiProperty({ example: '2' })
  readonly listId: string;
  @ApiProperty({ example: '0' })
  readonly color: number;
  @ApiProperty({ example: false })
  readonly is_completed: boolean;
}
