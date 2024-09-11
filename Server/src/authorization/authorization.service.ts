import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthorizationService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: UserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: UserDto) {
    const condidate = await this.userService.getUserByEmail(userDto.email);
    if (condidate) {
      throw new HttpException(
        'The user already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
    };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(userDto: UserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (user) {
      const passwordEquals = await bcrypt.compare(
        userDto.password,
        user.password,
      );
      if (passwordEquals) {
        return user;
      } else
        throw new UnauthorizedException({
          message: 'Access denied. Password is not correct',
        });
    } else
      throw new UnauthorizedException({
        message: 'Access denied. Email is not correct',
      });
  }

  async getUserFromToken(authorizationHeader: string): Promise<any> {
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException({
        message: 'Access denied. Login or password is not correct',
      });
    }
    const token = authorizationHeader.split(' ')[1];
    try {
      const decoded: User = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Access denied. Login or password is not correct',
      });
    }
  }
}
