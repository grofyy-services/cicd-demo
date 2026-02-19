import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUpdateDiscountPriceColumn1771053419784 implements MigrationInterface {
    name = 'AddUpdateDiscountPriceColumn1771053419784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "discountPercent" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "discountPercent"`);
    }

}
