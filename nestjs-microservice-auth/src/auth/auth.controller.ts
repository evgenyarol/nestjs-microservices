import { Controller, Post, Body, Get, Param, UseGuards, Request, Logger } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { User } from './auth.entity';
import { DoesUserExist } from './guards/DoesUserExist';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(DoesUserExist)
  @Post('signup')
  async signUp(@Body() user : User) {
    return this.authService.createUser(user);

  }

  @UseGuards(DoesUserExist)
  @Post('signup/:refUrl')
  async signUpWithRef(@Request() req, @Body() user : User){
      const refUrl = req.params.refUrl
      return this.authService.createUserWithRef(user, refUrl);
  }

  @MessagePattern({ role: 'auth', cmd: 'check' })
  async loggedIn(data) {
    try {
      const res = this.authService.validateToken(data.jwt);
      return res;
    } catch (e) {
      Logger.log(e);
      return false;
    }
  }
}
