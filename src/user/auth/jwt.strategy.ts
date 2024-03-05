// src/logical/auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { UserType } from '../type';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // JWT验证 - Step 4: 被守卫调用
  async validate(payload: UserType) {
    console.log(`JWT验证 - Step 4: 被守卫调用`);
    console.log(payload);
    // const user = await this.authService.validateUser({username: payload.username, password: pass});
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return user;
    return payload;
  }
}
