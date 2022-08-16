import { Injectable } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { UsersService } from "../user/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService
  ) {
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersService.createUser(authCredentialsDto);
  }

  // async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
  //   const {}
  // }
}
