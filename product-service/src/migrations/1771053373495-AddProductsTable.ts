import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductsTable1771053373495 implements MigrationInterface {
    name = 'AddProductsTable1771053373495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(200) NOT NULL, "description" text NOT NULL, "price" numeric(12,2) NOT NULL, "currency" character varying(10) NOT NULL DEFAULT 'USD', "imageUrl" character varying(500), "category" character varying(80) NOT NULL DEFAULT 'General', "stock" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_69b6137c844dc50305a2f2ec385" UNIQUE ("title", "category"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
