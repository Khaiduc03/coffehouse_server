import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsPhoneNumber,
	IsStrongPassword,
	MaxLength,
} from 'class-validator';

export class CreateCustomerDto {
	@IsNotEmpty()
	@MaxLength(50)
	first_name: string;

	@IsNotEmpty()
	@MaxLength(50)
	last_name: string;

	@IsOptional()
	@IsPhoneNumber('VN')
	phone_number?: string;

	@IsOptional()
	avatar?: string;

	@IsNotEmpty()
	@MaxLength(50)
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsStrongPassword()
	password: string;
}

export class CreateCustomerWithPhoneNumberDto {
	@IsNotEmpty()
	@IsPhoneNumber('VN')
	phone_number: string;

	@IsNotEmpty()
	@IsStrongPassword()
	password: string;
}

export class CreateCustomerWithEmailDto {
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsStrongPassword()
	password: string;
}
