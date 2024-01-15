import { ConflictException, Injectable } from '@nestjs/common';
import { CustomerService } from '../customer/customer.service';

import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'node:crypto';
import { createSuccessResponse } from 'src/common';
import { CustomerEntity, KeyTokenEntity } from 'src/entity';
import { JWTService } from 'src/shared/services/jwt.service';
import { RegisterType } from 'src/types/common.type';
import { Repository } from 'typeorm';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {
	private SALT_ROUND = process.env.SALT_ROUND || 10;
	constructor(
		private readonly customer_service: CustomerService,

		@InjectRepository(KeyTokenEntity)
		private readonly key_token_repository: Repository<KeyTokenEntity>,
		private readonly jwt_service: JWTService,
	) {}

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
			const hassed_password = await bcrypt.hash(createCustomerDto.password, 11);

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

			const payload = await this.generateKeyPairSync(new_customer);
			if (!payload) {
				throw new Error('Failed to generate key pair');
			}
			return createSuccessResponse(payload, 'Register');
		} catch (error) {
			throw error;
		}
	}

	async generateKeyPairSync(customer: Partial<CustomerEntity>) {
		const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
			modulusLength: 2096,
			publicKeyEncoding: {
				type: 'pkcs1',
				format: 'pem',
			},
			privateKeyEncoding: {
				type: 'pkcs8',
				format: 'pem',
			},
		});

		const { access_token, refresh_token } =
			await this.jwt_service.generateToken(
				{ id: customer.id },
				publicKey,
				privateKey,
			);

		const new_key_token = this.key_token_repository.create({
			customer_id: customer.id,
			public_key: publicKey,
			curent_refresh_token: refresh_token,
		});
		if (!new_key_token) {
			throw new Error('Failed to create key token');
		}
		await this.key_token_repository.save(new_key_token);
		return { access_token, refresh_token };
	}

	// async create_token_key(
	// 	payload: any,
	// 	expired_time: number,
	// ): Promise<KeyTokenEntity> {
	// 	try {
	// 		const new_key_token = this.key_token_repository.create({
	// 			...payload,
	// 			expired_time,
	// 		});
	// 		return await this.key_token_repository.save(new_key_token);
	// 	} catch (error) {
	// 		throw error;
	// 	}
	// }

	// ) {
	// 	try {

	// 	} catch (error) {

	// 	}

	// }
}
