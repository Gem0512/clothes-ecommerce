import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './interfaces/jwt-payload.interface'; // Định nghĩa JwtPayload nếu cần

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'clothes', // Lấy secret từ ConfigService
    });
  }

  async validate(payload: JwtPayload) {
    // Xử lý payload ở đây
    return { userId: payload.sub, username: payload.username };
  }
}
