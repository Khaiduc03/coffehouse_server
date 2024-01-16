import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly auth_service: AuthService) {
		super({ usernameField: 'email' });
	}

	async validate(email: string, password: string) {
		const customer = await this.auth_service.getAuthenticatedUser(
			email,
			password,
		);
		if (!customer) {
			console.log('hdone');
			throw new UnauthorizedException();
		}
		console.log('customer: ', customer);
		return customer;
	}

	// async validate(email: string, password: string) {
	// 	// // const user = await this.auth_service.getAuthenticatedUser(email, password);
	// 	// if (!user) {
	// 	// 	throw new UnauthorizedException();
	// 	// }
	// 	// return user;
	// }
}
