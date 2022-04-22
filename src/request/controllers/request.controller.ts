import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Prisma, User, Request } from '@prisma/client';
import { CreateRequestDto } from '../dto/create-request.dto';
import { RequestService } from '../services/request.service';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}
  // @Post()
  // create(@Body() createRequestDto: CreateRequestDto, @Req() req: RequestWithUser) {
  //   return this.requestService.createRequest(createRequestDto, req.user);
  // }

  @Post()
  async create(
    @Body() postData: CreateRequestDto): Promise<Request> {
    const { reason, requested_date_start, requested_date_end, created_by } = postData;
    return this.requestService.createRequest({
      reason,
      requested_date_start,
      requested_date_end,
      user: {
        connect: { id: +created_by },
      },
    });
  }


  @Get()
  findAll() {
    return this.requestService.getAllRequest();
  }

  // @Get(':id')
  // findOne(@Param('id') {id}: FindOneParams) {
  //   return this.requestService.getRequestbyId({ id_created_by: {
  //     id: id ,
  //     created_by: id,
  // }});;
  // }

  @Get(':id')
  async getRequestbyId(@Param('id') id: string): Promise<Request> {
    return this.requestService.getRequestbyId({ id_created_by: {
      id: Number(id) ,
      created_by: Number(id),
  }});
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
