import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RequestService } from '../services/request.service';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}
  @Post()
  create(@Body() request: Prisma.RequestCreateInput) {
    return this.requestService.createRequest(request);
  }

  @Get()
  findAll() {
    return this.requestService.getAllRequest();
  }

  @Get(':id')
  findOne(@Param('id') id: Prisma.RequestWhereUniqueInput) {
    return this.requestService.getRequestbyId(id);
  }

  @Put(':id')
  update(
    @Param('id') id: Prisma.RequestWhereUniqueInput,
    @Body() request: Prisma.RequestUpdateInput,
  ) {
    return this.requestService.updateRequest(id, request);
  }

  @Delete(':id')
  remove(@Param('id') id: Prisma.RequestWhereUniqueInput) {
    return this.requestService.deleteRequest(id);
  }
}
