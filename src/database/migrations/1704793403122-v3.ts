import { MigrationInterface, QueryRunner } from 'typeorm';

export class V31704793403122 implements MigrationInterface {
	name = 'V31704793403122';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "key_token" ("id" SERIAL NOT NULL, "public_key" character varying NOT NULL, "customer_id" integer NOT NULL, "customerId" integer, CONSTRAINT "PK_69e35b3971b114150ffbee4d73b" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "customer_address" ALTER COLUMN "created_at" SET DEFAULT '1704793404617'`,
		);
		await queryRunner.query(
			`ALTER TABLE "customer_address" ALTER COLUMN "updated_at" SET DEFAULT '1704793404617'`,
		);
		await queryRunner.query(
			`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '1704793404617'`,
		);
		await queryRunner.query(
			`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '1704793404617'`,
		);
		await queryRunner.query(
			`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT '1704793404617'`,
		);
		await queryRunner.query(
			`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT '1704793404617'`,
		);
		await queryRunner.query(
			`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '1704793404617'`,
		);
		await queryRunner.query(
			`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT '1704793404617'`,
		);
		await queryRunner.query(
			`ALTER TABLE "voucher" ALTER COLUMN "created_at" SET DEFAULT '1704793404617'`,
		);
		await queryRunner.query(
			`ALTER TABLE "voucher" ALTER COLUMN "updated_at" SET DEFAULT '1704793404617'`,
		);
		await queryRunner.query(
			`ALTER TABLE "toping" ALTER COLUMN "created_at" SET DEFAULT '1704793404617'`,
		);
		await queryRunner.query(
			`ALTER TABLE "toping" ALTER COLUMN "updated_at" SET DEFAULT '1704793404617'`,
		);
		await queryRunner.query(
			`ALTER TABLE "size" ALTER COLUMN "created_at" SET DEFAULT '1704793404617'`,
		);
		await queryRunner.query(
			`ALTER TABLE "size" ALTER COLUMN "updated_at" SET DEFAULT '1704793404617'`,
		);
		await queryRunner.query(
			`ALTER TABLE "categories" ALTER COLUMN "created_at" SET DEFAULT '1704793404617'`,
		);
		await queryRunner.query(
			`ALTER TABLE "categories" ALTER COLUMN "updated_at" SET DEFAULT '1704793404617'`,
		);
		await queryRunner.query(
			`ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '1704793404617'`,
		);
		await queryRunner.query(
			`ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT '1704793404617'`,
		);
		await queryRunner.query(
			`ALTER TABLE "media" ALTER COLUMN "created_at" SET DEFAULT '1704793404617'`,
		);
		await queryRunner.query(
			`ALTER TABLE "media" ALTER COLUMN "updated_at" SET DEFAULT '1704793404617'`,
		);
		await queryRunner.query(
			`ALTER TABLE "key_token" ADD CONSTRAINT "FK_4488184c5378b35e53f52f2681b" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "key_token" DROP CONSTRAINT "FK_4488184c5378b35e53f52f2681b"`,
		);
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
			`ALTER TABLE "categories" ALTER COLUMN "updated_at" SET DEFAULT '1704719938859'`,
		);
		await queryRunner.query(
			`ALTER TABLE "categories" ALTER COLUMN "created_at" SET DEFAULT '1704719938859'`,
		);
		await queryRunner.query(
			`ALTER TABLE "size" ALTER COLUMN "updated_at" SET DEFAULT '1704719938859'`,
		);
		await queryRunner.query(
			`ALTER TABLE "size" ALTER COLUMN "created_at" SET DEFAULT '1704719938859'`,
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
		await queryRunner.query(`DROP TABLE "key_token"`);
	}
}
