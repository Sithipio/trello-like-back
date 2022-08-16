import { IsNotEmpty } from "class-validator";

//Not usage

export class CreateTaskDto {
  @IsNotEmpty()
  taskName: string;
}