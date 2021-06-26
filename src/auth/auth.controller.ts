import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentionalsDto } from './dto/auth-credentionals.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentionalsDto: AuthCredentionalsDto) {
    return this.authService.signup(authCredentionalsDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentionalsDto: AuthCredentionalsDto) {
    return this.authService.signIn(authCredentionalsDto);
  }
}
