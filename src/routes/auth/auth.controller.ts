import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuth } from './entities/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  findOne(@Body() createEmployeeDto: LoginAuth) {
    return this.authService.findOne(createEmployeeDto);
  }
}
