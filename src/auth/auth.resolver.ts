import { Request, Response, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('login')
  @UseGuards(GqlAuthGuard)
  async login(@Context() context) {
    const loginData = await this.authService.login(context.user);

    const expires = new Date(Date.now() + 150 * 24 * 60 * 60 * 1000);

    context.res.cookie('joelCMS', loginData.accessToken, {
      httpOnly: true,
      signed: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      domain: 'localhost',
      expires,
    });

    return loginData;
  }

  @Query('activeUser')
  @UseGuards(JwtAuthGuard)
  activeUser(@Context() context) {
    return this.authService.activeUser(context.req.user.email);
  }

  @Mutation('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Context() context) {
    context.res.cookie('joelCMS', null, {
      httpOnly: true,
      signed: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      domain: 'localhost',
      maxAge: -1,
    });

    return true;
  }

  @Mutation('refreshToken')
  refreshToken() {
    return this.authService.refreshToken();
  }
}
