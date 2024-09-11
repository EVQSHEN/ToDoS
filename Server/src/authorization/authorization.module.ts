import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { UsersModule } from 'src/users/users.module';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'SECRET',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  exports: [AuthorizationService, JwtModule],
})
export class AuthorizationModule {}
