import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Request, User } from '@prisma/client';
import { RequestDto } from '../dto/request.dto';
import { RequestNotFoundException } from '../utils/request.exception';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaError } from '../utils/prismaError';
// import { CreateRequestDto } from '../dto/create-request.dto';

@Injectable()
export class RequestService {
  constructor(private prisma: PrismaService) {}

  async getAllRequest() {
    return await this.prisma.request.findMany();
  }

  async getRequestsByOwner(user: User): Promise<Request[]> {
    return await this.prisma.request.findMany({ where: { user } });
  }

  async getRequestById(id: number, user: User): Promise<Request> {
    const request = await this.prisma.request.findUnique({
      where: {
        id_created_by: {
          id: id,
          created_by: user.id,
        },
      },
    });
    if (!request) {
      throw new RequestNotFoundException(id);
    }
    return request;
  }

  async createRequest(request: RequestDto, user: User): Promise<Request> {
    return this.prisma.request.create({
      data: {
        ...request,
        user: {
          connect: { id: user.id },
        },
      },
    });
  }

  async updateRequest(
    id: number,
    request: RequestDto,
    user: User,
  ): Promise<Request> {
    try {
      return await this.prisma.request.update({
        data: {
          ...request,
        },
        where: {
          id_created_by: {
            id: id,
            created_by: user.id,
          },
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new RequestNotFoundException(id);
      }
      throw error;
    }
  }

  async deleteRequest(id: number): Promise<Request> {
    try {
      return await this.prisma.request.delete({
        where: {
          id_created_by: {
            id: id,
            created_by: null,
          },
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new RequestNotFoundException(id);
      }
      throw error;
    }
  }
}
