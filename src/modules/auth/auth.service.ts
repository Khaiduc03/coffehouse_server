import {
	BadRequestException,
	ConflictException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { CustomerService } from '../customer/customer.service';

import * as bcryptjs from 'bcryptjs';
import * as crypto from 'node:crypto';
import { createSuccessResponse } from 'src/common';
import { CustomerEntity } from 'src/entity';
import { JWTService } from 'src/shared/services/jwt.service';
import { RegisterType } from 'src/types/common.type';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {
	private SALT_ROUND = process.env.SALT_ROUND || 10;
	constructor(private readonly customer_service: CustomerService) {}

	async sign_up_with_email(createCustomerDto: UserLoginDto) {
		try {
			const existed_customer = await this.customer_service.checkExistField(
				'email',
				createCustomerDto.email,
			);

			if (existed_customer) {
				throw new ConflictException('Email already exist');
			}
			console.log(this.SALT_ROUND);
			const hassed_password = await bcryptjs.hash(
				createCustomerDto.password,
				11,
			);

			console.log(hassed_password);
			const random_name = `${createCustomerDto.email.split('@')[0]}${Math.floor(
				10 + Math.random() * (999 - 10),
			)}`;

			const new_customer = await this.customer_service.createCustomer(
				{
					email: createCustomerDto.email,
					password: hassed_password,
					first_name: random_name,
					last_name: null,
				},
				RegisterType.EMAIL,
			);
			console.log('ok1');

			const payload = await this.customer_service.generateKeyPairSync(
				new_customer.id,
			);

			if (!payload) {
				throw new Error('Failed to generate key pair');
			}

			return createSuccessResponse(payload, 'Register');
		} catch (error) {
			throw error;
		}
	}

	async login(customer_id: string | number) {
		try {
			console.log(customer_id);
			const payload =
				await this.customer_service.generateKeyPairSync(customer_id);
			if (!payload) {
				throw new Error('Failed to generate key pair');
			}

			return createSuccessResponse(
				{
					customer_id: customer_id,
					access_token: payload.access_token,
					refresh_token: payload.refresh_token,
				},
				'Login',
			);
		} catch (error) {
			throw error;
		}
	}
	async getAuthenticatedUser(
		email: string,
		password: string,
	): Promise<CustomerEntity> {
		try {
			const customer = await this.customer_service.checkExistField(
				'email',
				email,
			);
			await this.verifyPlainContentWithHashedContent(
				password,
				customer.password,
			);
			return customer;
		} catch (error) {
			throw new BadRequestException('Wrong credentials!!');
		}
	}

	private async verifyPlainContentWithHashedContent(
		plain_text: string,
		hashed_text: string,
	) {
		const is_matching = await bcryptjs.compare(plain_text, hashed_text);
		if (!is_matching) {
			throw new BadRequestException();
		}
	}
}
