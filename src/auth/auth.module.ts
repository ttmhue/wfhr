import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/services/user.service';
import { UserModule } from 'src/user/user.module';
import { jwtConstants } from './constants';
import { RolesGuard } from './guards/role.guard';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [PrismaService, AuthService, UserService, JwtStrategy, RolesGuard],
  exports: [AuthService],
})
export class AuthModule {}
