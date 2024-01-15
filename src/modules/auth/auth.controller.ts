import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		type: UserLoginDto,
		description: 'User info with access token',
	})
	async register(@Body() userLoginDto: UserLoginDto) {
		return await this.authService.sign_up_with_email(userLoginDto);
	}

	@Get('test')
	async test() {
		// return await this.authService.generateKeyPairSync();
	}
}
