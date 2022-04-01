import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAccessTokenTable1648225631280 implements MigrationInterface {
    // HERE I APPEND COLUMN TO EXISTING TABLE USING 'ALTER TABLE'
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE Tokens ADD COLUMN accessToken VARCHAR(250) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE Token DROP COLUMN accessToken');
    }

}
