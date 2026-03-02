import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  async login(loginDto: LoginDto) {
    // TODO: Implement actual authentication logic
    const { email, password } = loginDto;

    if (!email || !password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      accessToken: 'placeholder-token',
      user: { email },
    };
  }

  async register(registerDto: RegisterDto) {
    // TODO: Implement actual registration logic
    const { email, name } = registerDto;

    return {
      message: 'User registered successfully',
      user: { email, name },
    };
  }
}
