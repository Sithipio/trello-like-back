import { TaskStatus } from "../task-status.model";
import { IsEnum } from "class-validator";

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status : TaskStatus;
}