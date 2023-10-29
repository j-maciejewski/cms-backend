import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

function extractJwtFromCookie(request) {
  return request.signedCookies.joelCMS;
}

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        extractJwtFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: `${process.env.jwt_secret}`,
    });
  }

  async validate(payload: any) {
    return { data: payload.sub, email: payload.id };
  }
}
