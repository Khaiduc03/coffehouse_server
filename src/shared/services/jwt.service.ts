import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export type JwtPayload = {
	customer_id: string | number;
	[key: string]: any;
};

export type Token_type = 'access_token' | 'refresh_token';

@Injectable()
export class JWTService extends JwtService {
	constructor() {
		super();
	}
	async generateToken(
		payload: JwtPayload,
		public_key: string,
		private_key: string,
	) {
		try {
			console.log(payload);
			const access_token = await this.signAsync(payload, {
				algorithm: 'RS256',
				expiresIn: '1d',
				privateKey: private_key,
			});

			const refresh_token = await this.signAsync(payload, {
				algorithm: 'RS256',
				expiresIn: '7d',
				privateKey: private_key,
			});

			// const datd = await this.verify(access_token, {
			// 	algorithms: ['RS256'],
			// 	publicKey: public_key,
			// });

			return { access_token, refresh_token };
		} catch (error) {
			throw new BadRequestException('Invalid token');
		}
	}

	async verifyToken(token: string, public_key: string) {
		try {
			const payload = await this.verify(token, {
				algorithms: ['RS256'],
				publicKey: public_key,
			});
			return payload;
		} catch (error) {
			throw new BadRequestException('Invalid token');
		}
	}
}
