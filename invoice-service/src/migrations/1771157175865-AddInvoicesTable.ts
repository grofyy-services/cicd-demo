import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInvoicesTable1771157175865 implements MigrationInterface {
    name = 'AddInvoicesTable1771157175865'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "invoices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productId" character varying(36) NOT NULL, "productTitle" character varying(200) NOT NULL, "price" numeric(12,2) NOT NULL, "currency" character varying(10) NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "invoices"`);
    }

}
