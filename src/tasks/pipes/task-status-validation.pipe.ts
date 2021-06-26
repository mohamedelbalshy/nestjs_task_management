import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatuses } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  private readonly allowedStatuses: string[] = [
    TaskStatuses.DONE,
    TaskStatuses.IN_PROGRESS,
    TaskStatuses.OPEN,
  ];

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      return new BadRequestException(`"${value} is an invalid status"`);
    }

    return value;
  }

  private isStatusValid(status: string) {
    const idx = this.allowedStatuses.indexOf(status);

    return idx !== -1;
  }
}
