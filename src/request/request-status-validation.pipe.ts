import { PipeTransform, BadRequestException } from '@nestjs/common';
import { RequestStatus } from './request-status.enum';

export class RequestStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    RequestStatus.PENDING,
    RequestStatus.APPROVE,
    RequestStatus.REJECT,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}