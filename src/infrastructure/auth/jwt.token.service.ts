import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenService, ITokenPayload, ITokens } from './token.service.interface';

@Injectable()
export class JwtTokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateTokens(payload: ITokenPayload): Promise<ITokens> {
    const accessToken = this.jwtService.sign(payload, { expiresIn: '60m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async verifyRefreshToken(token: string): Promise<ITokenPayload> {
    return this.jwtService.verify(token);
  }
}
