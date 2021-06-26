import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentionalsDto } from './dto/auth-credentionals.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(
    authCredentionalsDto: AuthCredentionalsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.signUp(authCredentionalsDto);

    const payload: JwtPayload = { username: user.username };

    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  async signIn(
    authCredentionalsDto: AuthCredentionalsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.signIn(authCredentionalsDto);
    const payload: JwtPayload = { username: user.username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
