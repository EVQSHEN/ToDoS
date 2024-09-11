import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'email@example.com' })
  readonly email: string;
  @ApiProperty({ example: '12345678' })
  readonly password: string;
  @ApiProperty({ example: 'Name' })
  readonly name: string;
}
