import { CustomerEntity } from 'src/entity';

export interface RequestWithCustomer extends Request {
	user: CustomerEntity;
}
