import { IOrder } from 'src/interface';
import { Base } from './base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { StoreEntity } from './store.entity';

export enum OrderStatus {
	PENDING = 'pending',
	PROCESSING = 'processing',
	COMPLETED = 'completed',
	CANCELLED = 'cancelled',
	REFUNDED = 'refunded',
	FAILED = 'failed',
	ON_HOLD = 'on-hold',
}

export enum ShippingStatus {
	PENDING = 'pending',
	SHIPPED = 'shipped',
	DELIVERED = 'delivered',
	FAILED = 'failed',
	CANCELLED = 'cancelled',
}

export enum PaymentStatus {
	PENDING = 'pending',
	PAID = 'paid',
	FAILED = 'failed',
}

@Entity({ name: 'order' })
export class OrderEntity extends Base implements IOrder {
	@Column({ type: 'int' })
	customer_id: number;

	@ManyToOne(() => CustomerEntity, (customer) => customer.orders)
	@JoinColumn({
		name: 'customer_id',
		foreignKeyConstraintName: 'fk_customer_id',
		referencedColumnName: 'id',
	})
	customer: CustomerEntity;

	@Column({ type: 'bigint' })
	order_date: Date;

	@Column({
		type: 'enum',
		enum: OrderStatus,
		default: OrderStatus.PENDING,
	})
	order_status: string;

	@Column({
		type: 'enum',
		enum: ShippingStatus,
		default: ShippingStatus.PENDING,
	})
	shipping_status: ShippingStatus;

	@Column({
		type: 'enum',
		enum: PaymentStatus,
		default: PaymentStatus.PENDING,
	})
	payment_status: string;

	@Column({ type: 'varchar' })
	shipping_address: string;

	@Column({ type: 'int' })
	store_id: number;

	@ManyToOne(() => StoreEntity, (store) => store.orders)
	@JoinColumn({
		name: 'store_id',
		foreignKeyConstraintName: 'fk_store_id',
		referencedColumnName: 'id',
	})
	store: StoreEntity;

	@Column({ type: 'varchar', nullable: true })
	notes: string;

	constructor(order: Partial<OrderEntity>) {
		super();
		if (order) {
			Object.assign(this, order);
		}
	}
	store_loaction: string;
}
