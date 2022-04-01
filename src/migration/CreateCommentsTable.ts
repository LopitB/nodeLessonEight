import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCommentsTable1646940097603 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'Comments',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'text',
          type: 'varchar',
          width: 255,
          isNullable: false,
        },
        {
          name: 'authorId',
          type: 'int',
        },
        {
          name: 'postId',
          type: 'int',
        },
        {
          name: 'like',
          type: 'int',
          isNullable: false,
          default: 0
        },
        {
          name: 'dislike',
          type: 'int',
          isNullable: false,
          default: 0
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          isNullable: false,
          default: 'now()',
        },

        {
          name: 'deletedAt',
          type: 'timestamp',
          isNullable: true,
        },
      ],

      foreignKeys: [
        {
          columnNames: ['postId'],
          referencedTableName: 'Posts',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        {
          columnNames: ['authorId'],
          referencedTableName: 'Users',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      ]
    }), true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Comments', true)
  }

}
