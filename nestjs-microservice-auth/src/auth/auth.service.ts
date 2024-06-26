import { Injectable, Inject, Logger, RequestTimeoutException } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';
import { timeout, catchError } from 'rxjs/operators';
import { Repository, InsertResult, FindConditions } from 'typeorm';
import { TimeoutError, throwError } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './auth.entity';
import { AuthDto } from './dto/auth.dto';
import * as shortid from 'shortid';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly authRepository: Repository<User>) { }

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.findOneByEmail(email);
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

  async findOneByLogin(login: string): Promise<User | undefined> {
    return await this.authRepository.findOne({ where: { login } });
  }

  findOneById(id: any): Promise<User> {
    return this.authRepository.findOne({ where: { id } });
  }
  async updateUserById(id: number, user: User): Promise<any> {
    return await this.authRepository.update(id, user);
  }

  async findOneByRefUrl(refUrl: string): Promise<User> {
    return await this.authRepository.findOne({ where: { refUrl } });
  }

  async register(user: User): Promise<AuthDto> {
    const pass = await this.hashPassword(user.password);
    user.refUrl = shortid.generate()
    const register = await this.authRepository.save({ ...user, password: pass });
    const payload = { email: user.email, sub: register.id };
    const data = {
      id: register.id,
      login: register.login,
      email: register.email,
      telegram: register.telegram,
      subUserId: register.subUserId || null,
      accessToken: this.jwtService.sign(payload)
    }
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'aezakmitestaezakmi@gmail.com',
        pass: 'AEZAKMITESTPASS'
      }
    });
    const result = await transporter.sendMail({
      from: '"Test" <aezakmitestaezakmi@gmail.com>',
      to: register.email,
      subject: "Авторизация",
      text: "Тестовая Авторизация",
      html: ""
    });

    console.log(result);

    return data
  }

  async registerWithRef(user: User, refUrl: string): Promise<AuthDto> {
    const ref = await this.findOneByRefUrl(refUrl)
    if (ref) {
      console.log(ref)
      const pass = await this.hashPassword(user.password);
      user.refUrl = shortid.generate()
      const register = await this.authRepository.save({ ...user, password: pass });
      const payload = { email: user.email, sub: register.id };
      const data = {
        id: register.id,
        login: register.login,
        email: register.email,
        telegram: register.telegram,
        accessToken: this.jwtService.sign(payload)
      }
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'aezakmitestaezakmi@gmail.com',
          pass: 'Arol3094'
        }
      });

      const result = await transporter.sendMail({
        from: '"Test" <aezakmitestaezakmi@gmail.com>',
        to: register.email,
        subject: "Авторизация",
        text: "Тестовая Авторизация",
        html: ""
      });

      console.log(result);

      return data
    }
    else return null
  }

  async login(user) {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

}