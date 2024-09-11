import { Body, Controller, Headers, Get, Post } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { AuthorizationService } from './authorization.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('authorization')
@ApiTags('Authorization controller')
export class AuthorizationController {
  constructor(private authService: AuthorizationService) {}

  @ApiOperation({ summary: 'Sign in' })
  @Post('/signin')
  login(@Body() userDto: UserDto) {
    return this.authService.login(userDto);
  }
  @ApiOperation({ summary: 'Sign up' })
  @Post('/signup')
  registration(@Body() userDto: UserDto) {
    return this.authService.registration(userDto);
  }

  @ApiOperation({ summary: 'Verify token' })
  @Get('/verify')
  getUserFromToken(@Headers('authorization') token: string) {
    return this.authService.getUserFromToken(token);
  }
}
