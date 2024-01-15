import { Injectable } from '@nestjs/common';
import { CustomerEntity } from 'src/entity/customer.entity';
import {
	CreateCustomerWithEmailDto,
	CreateCustomerWithPhoneNumberDto,
} from 'src/modules/customer/dto/customer-register.dto';
import { DataSource, Repository } from 'typeorm';
@Injectable()
export class CustomerRepository extends Repository<CustomerEntity> {
	constructor(private dataSource: DataSource) {
		super(CustomerEntity, dataSource.createEntityManager());
	}
	async createCustomerWithField(
		createCustomerDto:
			| CreateCustomerWithEmailDto
			| CreateCustomerWithPhoneNumberDto,
		field: string,
	): Promise<any> {
		try {
			const newCustomer = this.create(createCustomerDto);
			return await this.save(newCustomer);
		} catch (error) {
			throw new Error(
				`Failed to create customer with ${field}. Reason: ${error.message}`,
			);
		}
	}

	async getCustomerById(id: number): Promise<CustomerEntity> {
		return await this.findOne({
			where: { id },
			relations: ['customerAddress'],
		});
	}

	async checkFieldExist(field: string, value: string): Promise<boolean> {
		try {
			const countResult = await this.count({ where: { [field]: value } });
			return Promise.resolve(countResult > 0 ? true : false);
		} catch (error) {
			throw error;
		}
	}
}
