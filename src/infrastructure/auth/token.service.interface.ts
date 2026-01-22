export interface ITokenPayload {
  username: string;
  sub: string;
  role: string;
}

export interface ITokens {
  access_token: string;
  refresh_token: string;
}

export const ITokenService = 'ITokenService';

export interface ITokenService {
  generateTokens(payload: ITokenPayload): Promise<ITokens>;
  verifyRefreshToken(token: string): Promise<ITokenPayload>;
}
