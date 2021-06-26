import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatuses } from '../task-status.enum';

export class SearchTaskDto {
  @IsOptional()
  @IsIn([TaskStatuses.DONE, TaskStatuses.IN_PROGRESS, TaskStatuses.OPEN])
  status: TaskStatuses;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
