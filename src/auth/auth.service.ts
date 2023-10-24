import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/types/graphql';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    // if (user && (await bcrypt.compare(password, user.password))) {
    if (user && password === user.password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = {
      id: user.email,
      sub: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.jwt_secret,
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: process.env.jwt_secret,
      }),
    };
  }

  async activeUser(email) {
    return this.userService.findOneByEmail(email);
  }

  async logout() {
    return true;
  }

  async refreshToken() {
    return true;
    // const payload = {
    //   email: user.email,
    //   sub: {
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //   },
    // };

    // return {
    //   accessToken: this.jwtService.sign(payload),
    // };
  }
}
