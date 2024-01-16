import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { Request } from 'express';
import { RequestWithCustomer } from 'src/types';

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

	@Post('login')
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		type: UserLoginDto,
		description: 'User info with access token',
	})
	@UseGuards(LocalAuthGuard)
	async login(@Req() request: RequestWithCustomer) {
		console.log(request.user.id);
		// console.log(request.user);
		// return 'hello';
		return await this.authService.login(request.user.id);
	}

	@Get('test')
	async test() {
		// return await this.authService.generateKeyPairSync();
	}
}
