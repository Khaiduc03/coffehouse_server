import { MigrationInterface, QueryRunner } from 'typeorm';

export class V21704720726549 implements MigrationInterface {
	name = 'V21704720726549';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "customer_address" ALTER COLUMN "created_at" SET DEFAULT '1704720728208'`,
		);
		await queryRunner.query(
			`ALTER TABLE "customer_address" ALTER COLUMN "updated_at" SET DEFAULT '1704720728208'`,
		);
		await queryRunner.query(
			`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '1704720728208'`,
		);
		await queryRunner.query(
			`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '1704720728208'`,
		);
		await queryRunner.query(
			`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT '1704720728208'`,
		);
		await queryRunner.query(
			`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT '1704720728208'`,
		);
		await queryRunner.query(
			`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '1704720728208'`,
		);
		await queryRunner.query(
			`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT '1704720728208'`,
		);
		await queryRunner.query(
			`ALTER TABLE "voucher" ALTER COLUMN "created_at" SET DEFAULT '1704720728208'`,
		);
		await queryRunner.query(
			`ALTER TABLE "voucher" ALTER COLUMN "updated_at" SET DEFAULT '1704720728208'`,
		);
		await queryRunner.query(
			`ALTER TABLE "toping" ALTER COLUMN "created_at" SET DEFAULT '1704720728208'`,
		);
		await queryRunner.query(
			`ALTER TABLE "toping" ALTER COLUMN "updated_at" SET DEFAULT '1704720728208'`,
		);
		await queryRunner.query(
			`ALTER TABLE "categories" ALTER COLUMN "created_at" SET DEFAULT '1704720728208'`,
		);
		await queryRunner.query(
			`ALTER TABLE "categories" ALTER COLUMN "updated_at" SET DEFAULT '1704720728208'`,
		);
		await queryRunner.query(
			`ALTER TABLE "size" ALTER COLUMN "created_at" SET DEFAULT '1704720728208'`,
		);
		await queryRunner.query(
			`ALTER TABLE "size" ALTER COLUMN "updated_at" SET DEFAULT '1704720728208'`,
		);
		await queryRunner.query(
			`ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '1704720728208'`,
		);
		await queryRunner.query(
			`ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT '1704720728208'`,
		);
		await queryRunner.query(
			`ALTER TABLE "media" ALTER COLUMN "created_at" SET DEFAULT '1704720728208'`,
		);
		await queryRunner.query(
			`ALTER TABLE "media" ALTER COLUMN "updated_at" SET DEFAULT '1704720728208'`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "media" ALTER COLUMN "updated_at" SET DEFAULT '1704719938859'`,
		);
		await queryRunner.query(
			`ALTER TABLE "media" ALTER COLUMN "created_at" SET DEFAULT '1704719938859'`,
		);
		await queryRunner.query(
			`ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT '1704719938859'`,
		);
		await queryRunner.query(
			`ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '1704719938859'`,
		);
		await queryRunner.query(
			`ALTER TABLE "size" ALTER COLUMN "updated_at" SET DEFAULT '1704719938859'`,
		);
		await queryRunner.query(
			`ALTER TABLE "size" ALTER COLUMN "created_at" SET DEFAULT '1704719938859'`,
		);
		await queryRunner.query(
			`ALTER TABLE "categories" ALTER COLUMN "updated_at" SET DEFAULT '1704719938859'`,
		);
		await queryRunner.query(
			`ALTER TABLE "categories" ALTER COLUMN "created_at" SET DEFAULT '1704719938859'`,
		);
		await queryRunner.query(
			`ALTER TABLE "toping" ALTER COLUMN "updated_at" SET DEFAULT '1704719938859'`,
		);
		await queryRunner.query(
			`ALTER TABLE "toping" ALTER COLUMN "created_at" SET DEFAULT '1704719938859'`,
		);
		await queryRunner.query(
			`ALTER TABLE "voucher" ALTER COLUMN "updated_at" SET DEFAULT '1704719938859'`,
		);
		await queryRunner.query(
			`ALTER TABLE "voucher" ALTER COLUMN "created_at" SET DEFAULT '1704719938859'`,
		);
		await queryRunner.query(
			`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT '1704719938859'`,
		);
		await queryRunner.query(
			`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '1704719938859'`,
		);
		await queryRunner.query(
			`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT '1704719938859'`,
		);
		await queryRunner.query(
			`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT '1704719938859'`,
		);
		await queryRunner.query(
			`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '1704719938859'`,
		);
		await queryRunner.query(
			`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '1704719938859'`,
		);
		await queryRunner.query(
			`ALTER TABLE "customer_address" ALTER COLUMN "updated_at" SET DEFAULT '1704719938859'`,
		);
		await queryRunner.query(
			`ALTER TABLE "customer_address" ALTER COLUMN "created_at" SET DEFAULT '1704719938859'`,
		);
	}
}
