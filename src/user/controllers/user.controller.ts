import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
}
