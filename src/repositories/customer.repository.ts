import { BadRequestException, Injectable } from '@nestjs/common';
import { CustomerEntity } from 'src/entity/customer.entity';
import { CreateCustomerDto } from 'src/modules/customer/dto/customer-register.dto';
import { Panigation } from 'src/modules/panigation';
import { PaginateOptions, SortOptions } from 'src/types/common.type';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CustomerRepository extends Repository<CustomerEntity> {
	constructor(private dataSource: DataSource) {
		super(CustomerEntity, dataSource.createEntityManager());
	}
	async createCustomerWithField(
		createCustomerDto: CreateCustomerDto,
		field: string,
	): Promise<any> {
		try {
			const newCustomer = this.create(createCustomerDto);
			//console.log(newCustomer);
			return await this.save(newCustomer);
		} catch (error) {
			throw new Error(
				`Failed to create customer with ${field}. Reason: ${error.message}`,
			);
		}
	}

	async checkFieldExist(field: string, value: string): Promise<CustomerEntity> {
		try {
			console.log(value);
			const user = await this.findOne({ where: { [field]: value } });
			return Promise.resolve(user);
		} catch (error) {
			throw error;
		}
	}

	async checkUserExist(email: string): Promise<CustomerEntity> {
		console.log('email1: ', email);
		const user = await this.findOne({ where: { email } });
		return user;
	}

	async findAllUser(options: PaginateOptions, sortOptions: SortOptions) {
		try {
			const takeRecord = options.take || 21;
			const page = options.page || 1;
			const sort_by = sortOptions.sort_by || 'id';
			const sort_type = sortOptions.sort_type || 'DESC';
			const [item, total] = await this.findAndCount({
				relations: options.relations,
				take: takeRecord,
				skip: (page - 1) * takeRecord,
				order: {
					[sort_by]: sort_type,
				},
			});
			return new Panigation<CustomerEntity>(item, total, page, takeRecord);
		} catch (error) {
			console.log('Reson: ', error.message);
			throw new BadRequestException(`Failed to get all user`);
		}
	}

	async findCustomerByField(
		field: string,
		value: string,
		relations?: string[],
	): Promise<CustomerEntity[]> {
		try {
			return await this.find({
				where: { [field]: value },
				relations,
			});
		} catch (error) {
			throw new BadRequestException(`Failed to get user by field`);
		}
	}
}
