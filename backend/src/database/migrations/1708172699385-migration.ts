import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1708172699385 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO users (username, email)
            VALUES ('user1', 'user1@example.com')`);
    await queryRunner.query(`
        INSERT INTO secret_info (user_id, password_hash)
            VALUES (1, md5('Qwerty123!'))`);
    await queryRunner.query(`
        INSERT INTO users (username, email)
            VALUES ('user2', 'user2@example.com')`);
    await queryRunner.query(`
        INSERT INTO secret_info (user_id, password_hash)
            VALUES (2, md5('Qwerty123!'))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users`);
  }
}
