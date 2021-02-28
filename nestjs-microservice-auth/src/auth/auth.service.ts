import { Injectable, Inject, Logger, RequestTimeoutException } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';
import { timeout, catchError } from 'rxjs/operators';
import { Repository, InsertResult, FindConditions } from 'typeorm';
import { TimeoutError, throwError } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './auth.entity';
import * as shortid from 'shortid';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly authRepository: Repository<User>) { }

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.findOneByUserName(username);
      if (!user) {
        return null;
      }
      if (compareSync(password, user?.password)) {
        return user;
      }
      return null;
    } catch (e) {
      Logger.log(e);
      throw e;
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.authRepository.findOne({ where: { email } });
  }

  async findOneByUserName(username: string): Promise<User> {
    return await this.authRepository.findOne({ where: { username } });
  }

  async findOneByRefUrl(refUrl: string): Promise<User> {
    return await this.authRepository.findOne({ where: { refUrl } });
  }

  async createUser(user: User): Promise<User> {
    const pass = await this.hashPassword(user.password);
    user.isEmailVerified = false
    user.refUrl = shortid.generate()
    const newUser = await this.authRepository.save({ ...user, password: pass });
    return newUser;
  }

  async createUserWithRef(user: User, refUrl: string): Promise<User> {
    const ref = await this.findOneByRefUrl(refUrl)
    if (ref) {
      console.log(ref)
      const pass = await this.hashPassword(user.password);
      user.isEmailVerified = false
      user.refUrl = shortid.generate()
      const newUser = await this.authRepository.save({ ...user, password: pass });
      return newUser;
    } else return null
  }

  async login(user) {
    if (user.isEmailVerified !== false) {
      const payload = { user, sub: user.id };
      return {
        userId: user.id,
        accessToken: this.jwtService.sign(payload)
      };
    } else return { err: "Email not Verified " }
  }

  validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  async findOneById(id: number): Promise<User> {
    return await this.authRepository.findOne({ where: { id } });
  }

}