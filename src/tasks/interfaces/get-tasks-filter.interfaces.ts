import { TaskStatus } from '../enums';

export interface IGetTasksFilter {
  status?: TaskStatus;
  search?: string;
}
