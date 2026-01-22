import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { ITokenService, ITokens } from './token.service.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @Inject(ITokenService)
    private readonly tokenService: ITokenService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<ITokens> {
    const payload = { username: user.username, sub: user.id, role: user.role };
    const tokens = await this.tokenService.generateTokens(payload);
    await this.usersService.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async refreshTokens(userId: string, refreshToken: string): Promise<ITokens> {
    const user = await this.usersService.findOne(userId);
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const isRefreshTokenMatching = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isRefreshTokenMatching) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload = { username: user.username, sub: user.id, role: user.role };
    const tokens = await this.tokenService.generateTokens(payload);
    await this.usersService.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }
}
