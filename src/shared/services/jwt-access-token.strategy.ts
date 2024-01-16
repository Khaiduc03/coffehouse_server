import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CustomerEntity } from 'src/entity';
import { CustomerService } from 'src/modules/customer/customer.service';
import { TokenPayload } from 'src/types';
import { HeadersType } from 'src/types/headers.type';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly customer_service: CustomerService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKeyProvider: async (request, jwtToken, done) => {
				try {
					const customer_id = request.headers[HeadersType.CLIENT_ID]; // Replace with your actual header key
					//console.log(customer_id);

					const publicKey =
						await this.customer_service.findPublicKey(customer_id);
					done(null, publicKey);
				} catch (error) {
					done(error, null);
					throw new UnauthorizedException();
				}
			},
		});
	}

	async validate(payload: TokenPayload): Promise<CustomerEntity> {
		console.log('hi1', payload);
		const user = await this.customer_service.checkExistField(
			'id',
			payload.customer_id,
		);

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
