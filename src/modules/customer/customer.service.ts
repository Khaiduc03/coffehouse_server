import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RegisterType } from 'src/types/common.type';
import { CreateCustomerDto } from './dto/customer-register.dto';
import { CustomerRepositoryInterface } from './interfaces/customer.interface';
import { KeyTokenRepositoryInterface } from './interfaces/key-token-inteface';
import * as crypto from 'node:crypto';
import { JWTService } from 'src/shared/services/jwt.service';
@Injectable()
export class CustomerService {
	constructor(
		@Inject('CustomerRepositoryInterface')
		private readonly customerRepository: CustomerRepositoryInterface,
		@Inject('KeyTokenRepositoryInterface')
		private readonly key_token_repository: KeyTokenRepositoryInterface,
		private readonly jwt_service: JWTService,
	) {}

	async createCustomer(
		createCustomerDto: CreateCustomerDto,
		field: RegisterType,
	): Promise<any> {
		try {
			return await this.customerRepository.createCustomerWithField(
				createCustomerDto,
				field,
			);
		} catch (error) {
			throw new BadRequestException(
				`Failed to create customer with ${field}. Reason: ${error.message}`,
			);
		}
	}

	async checkExistField(field: string, value: string): Promise<any> {
		try {
			return await this.customerRepository.checkFieldExist(field, value);
		} catch (error) {
			throw error;
		}
	}

	async generateKeyPairSync(customer_id: string | number) {
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
				{ customer_id: customer_id },
				publicKey,
				privateKey,
			);

		const existed_key_token = await this.key_token_repository.findOne({
			where: { customer_id: customer_id },
		});

		if (!existed_key_token) {
			console.log('chua ton tai');
			const new_key_token = this.key_token_repository.create({
				customer_id: customer_id,
				public_key: publicKey,
				curent_refresh_token: refresh_token,
			});
			await this.key_token_repository.save(new_key_token);
		} else {
			console.log('da ton tai');
			await this.key_token_repository.update(
				{
					customer_id: customer_id,
				},
				{
					curent_refresh_token: refresh_token,
					public_key: publicKey,
				},
			);
		}

		return { access_token, refresh_token };
	}

	async findPublicKey(customer_id: string | number) {
		const key_token = await this.key_token_repository.checkFieldExist(
			'customer_id',
			customer_id,
		);
		return key_token;
	}
}
