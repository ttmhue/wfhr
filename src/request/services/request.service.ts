import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Request, User } from '@prisma/client';
import { CreateRequestDto } from '../dto/create-request.dto';

@Injectable()
export class RequestService {
  findOne(id: number) {
    throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService) {}

  async getAllRequest() {
    return await this.prisma.request.findMany();
  }
  async getRequestbyId(
    id: Prisma.RequestWhereUniqueInput
  ): Promise<Request | null> {
    return await this.prisma.request.findUnique({
      where: id
    });
  }

  // async getRequestbyId(id: number) {
  //   const request = await this.prisma.request.findUnique({
  //     where: {
  //       id,
  //     },
  //   });
  //   if (!request) {
  //     throw new NotFoundException;
  //   }
  //   return request;
  // }
  // async createRequest(createRequestDto: CreateRequestDto, user: User) {
  //   return this.prisma.request.create({
  //     data: {
  //       reason: createRequestDto.reason,
  //       requested_date_start: createRequestDto.requested_date_start,
  //       requested_date_end: createRequestDto.requested_date_end,
  //       user: {
  //         connect: {
  //           id: user.id,
  //         },
  //       },
  //     },
  //   });
  // }

  async createRequest(data: Prisma.RequestCreateInput): Promise<Request> {
    return this.prisma.request.create({
      data,
    });
  }







  async deleteRequest(where: Prisma.RequestWhereUniqueInput): Promise<Request> {
    return await this.prisma.request.delete({
      where,
    });
  }

  async updateRequest(
    where: Prisma.RequestWhereUniqueInput,
    data: Prisma.RequestUpdateInput,
  ): Promise<Request> {
    return await this.prisma.request.update({
      where,
      data,
    });
  }
}
