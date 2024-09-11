import { ApiProperty } from '@nestjs/swagger';

export class ListDto {
  @ApiProperty({ example: 'Favorites' })
  readonly name: string;
  @ApiProperty({ example: '0' })
  readonly color: string;
}
