import { Injectable } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  async validateUser(payload: JwtPayload): Promise<any> {
    const user = {}; // Thay thế bằng logic thực tế của bạn để tìm người dùng
    return user ? user : null;
  }
}
