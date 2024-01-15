import { MigrationInterface, QueryRunner } from 'typeorm';

export class V21705149501442 implements MigrationInterface {
	name = 'V21705149501442';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "key_token" DROP CONSTRAINT "FK_4488184c5378b35e53f52f2681b"`,
		);
		await queryRunner.query(`ALTER TABLE "key_token" DROP COLUMN "customerId"`);
		await queryRunner.query(
			`ALTER TABLE "customer_address" ALTER COLUMN "created_at" SET DEFAULT '1705149502817'`,
		);
		await queryRunner.query(
			`ALTER TABLE "customer_address" ALTER COLUMN "updated_at" SET DEFAULT '1705149502817'`,
		);
		await queryRunner.query(
			`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '1705149502817'`,
		);
		await queryRunner.query(
			`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '1705149502817'`,
		);
		await queryRunner.query(
			`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT '1705149502817'`,
		);
		await queryRunner.query(
			`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT '1705149502817'`,
		);
		await queryRunner.query(
			`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '1705149502817'`,
		);
		await queryRunner.query(
			`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT '1705149502817'`,
		);
		await queryRunner.query(
			`ALTER TABLE "voucher" ALTER COLUMN "created_at" SET DEFAULT '1705149502817'`,
		);
		await queryRunner.query(
			`ALTER TABLE "voucher" ALTER COLUMN "updated_at" SET DEFAULT '1705149502817'`,
		);
		await queryRunner.query(
			`ALTER TABLE "toping" ALTER COLUMN "created_at" SET DEFAULT '1705149502817'`,
		);
		await queryRunner.query(
			`ALTER TABLE "toping" ALTER COLUMN "updated_at" SET DEFAULT '1705149502817'`,
		);
		await queryRunner.query(
			`ALTER TABLE "size" ALTER COLUMN "created_at" SET DEFAULT '1705149502817'`,
		);
		await queryRunner.query(
			`ALTER TABLE "size" ALTER COLUMN "updated_at" SET DEFAULT '1705149502817'`,
		);
		await queryRunner.query(
			`ALTER TABLE "categories" ALTER COLUMN "created_at" SET DEFAULT '1705149502817'`,
		);
		await queryRunner.query(
			`ALTER TABLE "categories" ALTER COLUMN "updated_at" SET DEFAULT '1705149502817'`,
		);
		await queryRunner.query(
			`ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '1705149502817'`,
		);
		await queryRunner.query(
			`ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT '1705149502817'`,
		);
		await queryRunner.query(
			`ALTER TABLE "media" ALTER COLUMN "created_at" SET DEFAULT '1705149502817'`,
		);
		await queryRunner.query(
			`ALTER TABLE "media" ALTER COLUMN "updated_at" SET DEFAULT '1705149502817'`,
		);
		await queryRunner.query(
			`ALTER TABLE "key_token" ADD CONSTRAINT "FK_f251ed29013ecff292ee724db96" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "key_token" DROP CONSTRAINT "FK_f251ed29013ecff292ee724db96"`,
		);
		await queryRunner.query(
			`ALTER TABLE "media" ALTER COLUMN "updated_at" SET DEFAULT '1705147624822'`,
		);
		await queryRunner.query(
			`ALTER TABLE "media" ALTER COLUMN "created_at" SET DEFAULT '1705147624821'`,
		);
		await queryRunner.query(
			`ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT '1705147624822'`,
		);
		await queryRunner.query(
			`ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '1705147624821'`,
		);
		await queryRunner.query(
			`ALTER TABLE "categories" ALTER COLUMN "updated_at" SET DEFAULT '1705147624822'`,
		);
		await queryRunner.query(
			`ALTER TABLE "categories" ALTER COLUMN "created_at" SET DEFAULT '1705147624821'`,
		);
		await queryRunner.query(
			`ALTER TABLE "size" ALTER COLUMN "updated_at" SET DEFAULT '1705147624822'`,
		);
		await queryRunner.query(
			`ALTER TABLE "size" ALTER COLUMN "created_at" SET DEFAULT '1705147624821'`,
		);
		await queryRunner.query(
			`ALTER TABLE "toping" ALTER COLUMN "updated_at" SET DEFAULT '1705147624822'`,
		);
		await queryRunner.query(
			`ALTER TABLE "toping" ALTER COLUMN "created_at" SET DEFAULT '1705147624821'`,
		);
		await queryRunner.query(
			`ALTER TABLE "voucher" ALTER COLUMN "updated_at" SET DEFAULT '1705147624822'`,
		);
		await queryRunner.query(
			`ALTER TABLE "voucher" ALTER COLUMN "created_at" SET DEFAULT '1705147624821'`,
		);
		await queryRunner.query(
			`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT '1705147624822'`,
		);
		await queryRunner.query(
			`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '1705147624821'`,
		);
		await queryRunner.query(
			`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT '1705147624822'`,
		);
		await queryRunner.query(
			`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT '1705147624821'`,
		);
		await queryRunner.query(
			`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '1705147624822'`,
		);
		await queryRunner.query(
			`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '1705147624821'`,
		);
		await queryRunner.query(
			`ALTER TABLE "customer_address" ALTER COLUMN "updated_at" SET DEFAULT '1705147624822'`,
		);
		await queryRunner.query(
			`ALTER TABLE "customer_address" ALTER COLUMN "created_at" SET DEFAULT '1705147624821'`,
		);
		await queryRunner.query(`ALTER TABLE "key_token" ADD "customerId" integer`);
		await queryRunner.query(
			`ALTER TABLE "key_token" ADD CONSTRAINT "FK_4488184c5378b35e53f52f2681b" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}
}
