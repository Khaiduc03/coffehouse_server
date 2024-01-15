import { MigrationInterface, QueryRunner } from 'typeorm';

export class V11705147623592 implements MigrationInterface {
	name = 'V11705147623592';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "toping" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1705147624821', "updated_at" bigint NOT NULL DEFAULT '1705147624822', "deleted_at" bigint, "toping_name" character varying(256) NOT NULL, "price" double precision NOT NULL, "image_thumbnail" character varying, CONSTRAINT "PK_5604a12bc70e84ef58c5553b45f" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "customer_address" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1705147624821', "updated_at" bigint NOT NULL DEFAULT '1705147624822', "deleted_at" bigint, "customer_id" integer NOT NULL, "address_line1" character varying, "address_line2" character varying, "city" character varying, "country" character varying, "phone_number" character varying, CONSTRAINT "PK_23810fb397050d8ac37dae44ff6" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "store" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1705147624821', "updated_at" bigint NOT NULL DEFAULT '1705147624822', "deleted_at" bigint, "store_name" character varying(256) NOT NULL, "address" character varying NOT NULL, "phone" character varying NOT NULL DEFAULT '0123456789', "email" character varying NOT NULL DEFAULT 'coffeehouse@gmail.com', "image_thumbnail" character varying, CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TYPE "public"."order_order_status_enum" AS ENUM('pending', 'processing', 'completed', 'cancelled', 'refunded', 'failed', 'on-hold')`,
		);
		await queryRunner.query(
			`CREATE TYPE "public"."order_shipping_status_enum" AS ENUM('pending', 'shipped', 'delivered', 'failed', 'cancelled')`,
		);
		await queryRunner.query(
			`CREATE TYPE "public"."order_payment_status_enum" AS ENUM('pending', 'paid', 'failed')`,
		);
		await queryRunner.query(
			`CREATE TABLE "order" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1705147624821', "updated_at" bigint NOT NULL DEFAULT '1705147624822', "deleted_at" bigint, "customer_id" integer NOT NULL, "order_date" bigint NOT NULL, "order_status" "public"."order_order_status_enum" NOT NULL DEFAULT 'pending', "shipping_status" "public"."order_shipping_status_enum" NOT NULL DEFAULT 'pending', "payment_status" "public"."order_payment_status_enum" NOT NULL DEFAULT 'pending', "shipping_address" character varying NOT NULL, "store_id" integer NOT NULL, "notes" character varying, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1705147624821', "updated_at" bigint NOT NULL DEFAULT '1705147624822', "deleted_at" bigint, "first_name" character varying(50), "last_name" character varying(50), "avatar" character varying, "phone_number" character varying(50), "email" character varying(100), "password" character varying NOT NULL, CONSTRAINT "UQ_998bb43a16f512608c017301523" UNIQUE ("phone_number"), CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb" UNIQUE ("email"), CONSTRAINT "UQ_6c497e212bc2ac2329cb4c059d3" UNIQUE ("password"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "voucher" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1705147624821', "updated_at" bigint NOT NULL DEFAULT '1705147624822', "deleted_at" bigint, "voucher_name" character varying(256) NOT NULL, "voucher_code" character varying(10) NOT NULL, "discount" double precision NOT NULL, "start_date" bigint NOT NULL, "end_date" bigint NOT NULL, "active" boolean NOT NULL, "point" integer NOT NULL, CONSTRAINT "PK_677ae75f380e81c2f103a57ffaf" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "size" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1705147624821', "updated_at" bigint NOT NULL DEFAULT '1705147624822', "deleted_at" bigint, "size_name" character varying(256) NOT NULL, "price" double precision NOT NULL, CONSTRAINT "PK_66e3a0111d969aa0e5f73855c7a" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1705147624821', "updated_at" bigint NOT NULL DEFAULT '1705147624822', "deleted_at" bigint, "categories_name" character varying(256) NOT NULL, "category_description" character varying(500), "icon" character varying, "active" character varying, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "product" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1705147624821', "updated_at" bigint NOT NULL DEFAULT '1705147624822', "deleted_at" bigint, "product_name" character varying(256) NOT NULL, "description" text DEFAULT 'Information still update', "regular_price" double precision NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "key_token" ("id" SERIAL NOT NULL, "public_key" character varying NOT NULL, "customer_id" integer NOT NULL, "customerId" integer, CONSTRAINT "PK_69e35b3971b114150ffbee4d73b" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TYPE "public"."media_type_enum" AS ENUM('image', 'video')`,
		);
		await queryRunner.query(
			`CREATE TABLE "media" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1705147624821', "updated_at" bigint NOT NULL DEFAULT '1705147624822', "deleted_at" bigint, "name" character varying(256) NOT NULL, "product_id" integer NOT NULL, "path" character varying(256) NOT NULL, "type" "public"."media_type_enum" NOT NULL DEFAULT 'image', "is_thumbnail" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "customer_voucher" ("customer_id" integer NOT NULL, "voucher_id" integer NOT NULL, CONSTRAINT "PK_a304b6f44cb1dc49d606f67ead9" PRIMARY KEY ("customer_id", "voucher_id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_6dae9992e7a47754279bac37a7" ON "customer_voucher" ("customer_id") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_7120ceb2620d5854a46a01e852" ON "customer_voucher" ("voucher_id") `,
		);
		await queryRunner.query(
			`CREATE TABLE "product_categories" ("categories_id" integer NOT NULL, "product_id" integer NOT NULL, CONSTRAINT "PK_eb09617fa89044e3f67e0c46a77" PRIMARY KEY ("categories_id", "product_id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_ff38612f12da4c40211df002e3" ON "product_categories" ("categories_id") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_8748b4a0e8de6d266f2bbc877f" ON "product_categories" ("product_id") `,
		);
		await queryRunner.query(
			`CREATE TABLE "product_topings" ("product_id" integer NOT NULL, "toping_id" integer NOT NULL, CONSTRAINT "PK_8d6dff9abe8b50c847a2c0c27af" PRIMARY KEY ("product_id", "toping_id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_f2cf4b0bd5aae7c69497bd50ee" ON "product_topings" ("product_id") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_ba6f90d1d399959f25bd0c9bd2" ON "product_topings" ("toping_id") `,
		);
		await queryRunner.query(
			`CREATE TABLE "categories_size" ("categories_id" integer NOT NULL, "size_id" integer NOT NULL, CONSTRAINT "PK_86c27430531d0f0451edc2c6a73" PRIMARY KEY ("categories_id", "size_id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_9f64d03fb8e3296b2147eb1db1" ON "categories_size" ("categories_id") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_1db5d2f7b4c92231f1c6dccbe3" ON "categories_size" ("size_id") `,
		);
		await queryRunner.query(
			`ALTER TABLE "customer_address" ADD CONSTRAINT "fk_customer_address_customer_id" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "order" ADD CONSTRAINT "fk_customer_id" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "order" ADD CONSTRAINT "fk_store_id" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "key_token" ADD CONSTRAINT "FK_4488184c5378b35e53f52f2681b" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "media" ADD CONSTRAINT "fk_media_product_id" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		);
		await queryRunner.query(
			`ALTER TABLE "customer_voucher" ADD CONSTRAINT "FK_6dae9992e7a47754279bac37a7a" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		);
		await queryRunner.query(
			`ALTER TABLE "customer_voucher" ADD CONSTRAINT "FK_7120ceb2620d5854a46a01e852a" FOREIGN KEY ("voucher_id") REFERENCES "voucher"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		);
		await queryRunner.query(
			`ALTER TABLE "product_categories" ADD CONSTRAINT "FK_ff38612f12da4c40211df002e3c" FOREIGN KEY ("categories_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		);
		await queryRunner.query(
			`ALTER TABLE "product_categories" ADD CONSTRAINT "FK_8748b4a0e8de6d266f2bbc877f6" FOREIGN KEY ("product_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		);
		await queryRunner.query(
			`ALTER TABLE "product_topings" ADD CONSTRAINT "FK_f2cf4b0bd5aae7c69497bd50ee8" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		);
		await queryRunner.query(
			`ALTER TABLE "product_topings" ADD CONSTRAINT "FK_ba6f90d1d399959f25bd0c9bd29" FOREIGN KEY ("toping_id") REFERENCES "toping"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		);
		await queryRunner.query(
			`ALTER TABLE "categories_size" ADD CONSTRAINT "FK_9f64d03fb8e3296b2147eb1db15" FOREIGN KEY ("categories_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		);
		await queryRunner.query(
			`ALTER TABLE "categories_size" ADD CONSTRAINT "FK_1db5d2f7b4c92231f1c6dccbe38" FOREIGN KEY ("size_id") REFERENCES "size"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "categories_size" DROP CONSTRAINT "FK_1db5d2f7b4c92231f1c6dccbe38"`,
		);
		await queryRunner.query(
			`ALTER TABLE "categories_size" DROP CONSTRAINT "FK_9f64d03fb8e3296b2147eb1db15"`,
		);
		await queryRunner.query(
			`ALTER TABLE "product_topings" DROP CONSTRAINT "FK_ba6f90d1d399959f25bd0c9bd29"`,
		);
		await queryRunner.query(
			`ALTER TABLE "product_topings" DROP CONSTRAINT "FK_f2cf4b0bd5aae7c69497bd50ee8"`,
		);
		await queryRunner.query(
			`ALTER TABLE "product_categories" DROP CONSTRAINT "FK_8748b4a0e8de6d266f2bbc877f6"`,
		);
		await queryRunner.query(
			`ALTER TABLE "product_categories" DROP CONSTRAINT "FK_ff38612f12da4c40211df002e3c"`,
		);
		await queryRunner.query(
			`ALTER TABLE "customer_voucher" DROP CONSTRAINT "FK_7120ceb2620d5854a46a01e852a"`,
		);
		await queryRunner.query(
			`ALTER TABLE "customer_voucher" DROP CONSTRAINT "FK_6dae9992e7a47754279bac37a7a"`,
		);
		await queryRunner.query(
			`ALTER TABLE "media" DROP CONSTRAINT "fk_media_product_id"`,
		);
		await queryRunner.query(
			`ALTER TABLE "key_token" DROP CONSTRAINT "FK_4488184c5378b35e53f52f2681b"`,
		);
		await queryRunner.query(
			`ALTER TABLE "order" DROP CONSTRAINT "fk_store_id"`,
		);
		await queryRunner.query(
			`ALTER TABLE "order" DROP CONSTRAINT "fk_customer_id"`,
		);
		await queryRunner.query(
			`ALTER TABLE "customer_address" DROP CONSTRAINT "fk_customer_address_customer_id"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_1db5d2f7b4c92231f1c6dccbe3"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_9f64d03fb8e3296b2147eb1db1"`,
		);
		await queryRunner.query(`DROP TABLE "categories_size"`);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_ba6f90d1d399959f25bd0c9bd2"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_f2cf4b0bd5aae7c69497bd50ee"`,
		);
		await queryRunner.query(`DROP TABLE "product_topings"`);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_8748b4a0e8de6d266f2bbc877f"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_ff38612f12da4c40211df002e3"`,
		);
		await queryRunner.query(`DROP TABLE "product_categories"`);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_7120ceb2620d5854a46a01e852"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_6dae9992e7a47754279bac37a7"`,
		);
		await queryRunner.query(`DROP TABLE "customer_voucher"`);
		await queryRunner.query(`DROP TABLE "media"`);
		await queryRunner.query(`DROP TYPE "public"."media_type_enum"`);
		await queryRunner.query(`DROP TABLE "key_token"`);
		await queryRunner.query(`DROP TABLE "product"`);
		await queryRunner.query(`DROP TABLE "categories"`);
		await queryRunner.query(`DROP TABLE "size"`);
		await queryRunner.query(`DROP TABLE "voucher"`);
		await queryRunner.query(`DROP TABLE "customer"`);
		await queryRunner.query(`DROP TABLE "order"`);
		await queryRunner.query(`DROP TYPE "public"."order_payment_status_enum"`);
		await queryRunner.query(`DROP TYPE "public"."order_shipping_status_enum"`);
		await queryRunner.query(`DROP TYPE "public"."order_order_status_enum"`);
		await queryRunner.query(`DROP TABLE "store"`);
		await queryRunner.query(`DROP TABLE "customer_address"`);
		await queryRunner.query(`DROP TABLE "toping"`);
	}
}
