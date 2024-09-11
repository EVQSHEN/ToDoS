import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { AuthorizationService } from 'src/authorization/authorization.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private authService: AuthorizationService,
  ) {}

  async createUser(dto: UserDto) {
    const user = await this.userRepository.create(dto);

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });

    return user;
  }

  async profile(token: string) {
    const user = await this.authService.getUserFromToken(token);

    if (user) {
      const result = await this.userRepository.findOne({
        where: { email: user.email },
      });

      if (result) {
        return {
          name: result.name,
          email: result.email,
        };
      }
    }
  }
}
