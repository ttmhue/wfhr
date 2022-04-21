import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Request } from '@prisma/client';

@Injectable()
export class RequestService {
  constructor(private prisma: PrismaService) {}

  async getAllRequest() {
    return await this.prisma.request.findMany();
  }
  async getRequestbyId(
    id: Prisma.RequestWhereUniqueInput,
  ): Promise<Request | null> {
    return await this.prisma.request.findUnique({
      where: id,
    });
  }

  async createRequest(data: Prisma.RequestCreateInput): Promise<Request> {
    return await this.prisma.request.create({
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
