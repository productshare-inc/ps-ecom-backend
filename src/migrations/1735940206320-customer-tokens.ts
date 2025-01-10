import {MigrationInterface, QueryRunner} from "typeorm";

export class customerTokens1735940206320 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_9721d76d2acd3371b26736accc9"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "customFieldsXlogintoken"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_2e4d342dbc9526c2016d2034425"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "customFieldsXrefreshtoken"`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" ADD "customFieldsXlogintoken" character varying(255)`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "UQ_7ef220faade161349186e06d1b2" UNIQUE ("customFieldsXlogintoken")`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" ADD "customFieldsXrefreshtoken" character varying(255)`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "UQ_eb7f077ecdd8c6be6570c691ec3" UNIQUE ("customFieldsXrefreshtoken")`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "UQ_eb7f077ecdd8c6be6570c691ec3"`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "customFieldsXrefreshtoken"`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "UQ_7ef220faade161349186e06d1b2"`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "customFieldsXlogintoken"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "customFieldsXrefreshtoken" character varying(255)`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_2e4d342dbc9526c2016d2034425" UNIQUE ("customFieldsXrefreshtoken")`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "customFieldsXlogintoken" character varying(255)`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_9721d76d2acd3371b26736accc9" UNIQUE ("customFieldsXlogintoken")`, undefined);
   }

}
