import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma, Request, User } from '@prisma/client';
import { GetUser } from 'src/common/decorators/req-user.decorator';
import { RequestDto } from '../dto/request.dto';
import { FindOneParams } from '../../common/utils/findOneParam';
import { RequestService } from '../services/request.service';
import { RequestStatus } from '../request-status.enum';
import { RequestStatusValidationPipe } from '../request-status-validation.pipe';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}
  @Get('hr')
  async getAllRequests() {
    return this.requestService.getAllRequests();
  }
  
  @Get('dev')
  async getRequestsByOwner(@GetUser() user: User): Promise<Request[]> {
    return this.requestService.getRequestsByOwner(user);
  }

  @Get('tl/:id')
  async getRequestsByTeam(@Param() id: User) {
    return this.requestService.getRequestsByTeam(id);
  }

  @Get(':id')
  getRequestById(
    @Param() { id }: FindOneParams,
    @GetUser() user: User,
  ): Promise<Request> {
    return this.requestService.getRequestById(Number(id), user);
  }

  @Post()
  async createRequest(
    @Body() request: RequestDto,
    @GetUser() user: User,
  ): Promise<Request> {
    return this.requestService.createRequest(request, user);
  }

  @Put(':id')
  async updateRequest(
    @Param() { id }: FindOneParams,
    @Body() request: RequestDto,
    @GetUser() user: User,
  ): Promise<Request> {
    return this.requestService.updateRequest(Number(id), request, user);
  }

  @Patch(':id/status')
  async updateRequestStatus(
    @Param() { id }: FindOneParams,
    @Body('status', RequestStatusValidationPipe) status: RequestStatus,
  ): Promise<Request> {
    return this.requestService.updateRequestStatus(Number(id), status);
  }

  @Delete(':id')
  async deleteRequest(@Param() { id }: FindOneParams) {
    return this.requestService.deleteRequest(Number(id));
  }
}
