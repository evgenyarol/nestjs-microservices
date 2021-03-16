import { Controller, Post, Body, Put, Param, UseGuards, Request, Logger, Response, Get } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { User } from './auth.entity';
import { DoesUserExist } from './guards/DoesUserExist';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { upload } from './uploadimage'

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService) { }

  // Sign In
  @UseGuards(DoesUserExist)
  @Post('signup')
  async signUp(@Body() user: User) {
    return this.authService.register(user);
  }

  @UseGuards(DoesUserExist)
  @Post('signup/:refUrl')
  async signUpWithRef(@Request() request, @Body() user: User) {
    const refUrl = request.params.refUrl
    return this.authService.registerWithRef(user, refUrl);
  }

  // Sign Up
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Request() request) {
    return this.authService.login(request.user);
  }

  // Update avatar
  @Put('profile/avatar/:id')
  @UseGuards(JwtAuthGuard)
  async updateProfileAvatar(@Param('id') id: number, @Body() user: User, @Response() response, @Request() request) {
    const singleUpload = upload.single("avatar");
    await singleUpload(request, response, (err) => {
      if (err) {
        return response.status(422).send({
          errors: [{ title: "File Upload Error", detail: err.message }]
        });
      }
      user.avatar = request.file.location
      this.authService.updateUserById(id, user)
      return response.json(user);
    });
  }

  // Update profile
  @Put('profile/:id')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Param('id') id: number, @Body() user: User, @Response() response) {
    this.authService.updateUserById(id, user)
    return response.json(user);
  }


  // Get Me
  @Get('getMe')
  @UseGuards(JwtAuthGuard)
  public async testAuth(@Request() request: any): Promise<any> {
    return this.authService.findOneById(request.user.id);
  }

  @MessagePattern({ role: 'user', cmd: 'get' })
  async getProfileById(id): Promise<User> {
    return this.authService.findOneById(id);
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
