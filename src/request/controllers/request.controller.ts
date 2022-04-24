import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma, Request, User } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/auth.decorator';
import { RequestDto } from '../dto/request.dto';
import { FindOneParams } from '../utils/findOneParam';
import { RequestService } from '../services/request.service';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Get()
  findAll() {
    return this.requestService.getAllRequest();
  }

  @Get('mine')
  async getRequestsByOwner(@GetUser() user: User): Promise<Request[]> {
    return this.requestService.getRequestsByOwner(user);
  }

  @Get(':id')
  getPostById(
    @Param() { id }: FindOneParams,
    @GetUser() user: User,
  ): Promise<Request> {
    return this.requestService.getRequestById(Number(id), user);
  }

  @Post()
  async createRequest(
    @Body() request: RequestDto, 
    @GetUser() user: User
  ): Promise<Request> {
    return this.requestService.createRequest(request, user);
  }

  @Put(':id')
  async updateRequest(
    @Param() { id }: FindOneParams, 
    @Body() post: RequestDto,
    @GetUser() user: User
  ): Promise<Request> {
    return this.requestService.updateRequest(Number(id), post, user);
  }

  @Delete(':id')
  async deleteRequest(
    @Param() { id }: FindOneParams,
  ) {
    return this.requestService.deleteRequest(Number(id));
  }
}
