import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "../auth/dto/auth-credentials.dto";
import * as bcrypt from "bcrypt";


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { userPassword } = authCredentialsDto;
    const user = this.usersRepository.create({
      ...authCredentialsDto,
      userPassword: await this.hashPassword(userPassword)
    });
    try {
      await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("Username already exists");
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

}
