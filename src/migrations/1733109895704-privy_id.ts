import {MigrationInterface, QueryRunner} from "typeorm";

export class privyId1733109895704 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "customer" ADD "customFieldsPrivy_id" character varying(255)`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "UQ_4e67945f3dc387001b4b0ef34c3" UNIQUE ("customFieldsPrivy_id")`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "UQ_4e67945f3dc387001b4b0ef34c3"`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "customFieldsPrivy_id"`, undefined);
   }

}
