import { TaskStatus } from '../task-status.model';

export interface IGetTasksFilter {
  status?: TaskStatus;
  search?: string;
}
