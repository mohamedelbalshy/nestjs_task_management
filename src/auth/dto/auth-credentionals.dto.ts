import { MaxLength, MinLength } from 'class-validator';

export class AuthCredentionalsDto {
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @MinLength(8)
  @MaxLength(20)
  password: string;
}
