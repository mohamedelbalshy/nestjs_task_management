import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { AuthCredentionalsDto } from './dto/auth-credentionals.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentionalsDto: AuthCredentionalsDto): Promise<User> {
    const { username, password } = authCredentionalsDto;

    const salt = await bcrypt.genSalt();
    const user = new User();
    user.username = username;

    user.password = await this.hashPassword(password, salt);

    try {
      await user.save();

      return user;
    } catch (error) {
      if ((error.code = '23505')) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  private async validatePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  async signIn(authCredentionalsDto: AuthCredentionalsDto): Promise<User> {
    const { username, password } = authCredentionalsDto;

    const userFound = await User.findOne({
      username: username,
    });

    if (userFound) {
      const validPassword = await this.validatePassword(
        password,
        userFound.password,
      );

      if (validPassword) {
        return userFound;
      } else {
        throw new UnauthorizedException('invalid credentials');
      }
    } else {
      throw new NotFoundException();
    }
  }
}
