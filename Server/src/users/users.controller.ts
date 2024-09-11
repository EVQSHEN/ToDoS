import {
  Body,
  Headers,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../authorization/jwt-auth.guard';

@Controller('users')
@ApiTags('UsersController')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDTO: UserDto) {
    return this.userService.createUser(userDTO);
  }

  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  profile(@Headers('authorization') token: string) {
    return this.userService.profile(token);
  }
}
