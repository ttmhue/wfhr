import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [PrismaService, AuthService, UserService],
  controllers: [UserController],
})
export class UserModule {}
