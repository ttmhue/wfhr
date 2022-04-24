import { NotFoundException } from '@nestjs/common';
 
export class RequestNotFoundException extends NotFoundException {
  constructor(requestId: number) {
    super(`Request with id ${requestId} not found`);
  }
}