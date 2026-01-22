import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { RefreshTokenDto } from '../../components/auth/dto/refresh-token.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('refresh')
  @ApiBody({ type: RefreshTokenDto })
  @UseGuards(AuthGuard('jwt-refresh'))
  async refresh(@Request() req, @Body('refreshToken') refreshToken: string) {
    return this.authService.refreshTokens(req.user.userId, refreshToken);
  }
}
