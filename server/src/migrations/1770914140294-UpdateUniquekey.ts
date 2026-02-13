import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUniquekey1770914140294 implements MigrationInterface {
    name = 'UpdateUniquekey1770914140294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "UQ_69b6137c844dc50305a2f2ec385" UNIQUE ("title", "category")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "UQ_69b6137c844dc50305a2f2ec385"`);
    }

}
