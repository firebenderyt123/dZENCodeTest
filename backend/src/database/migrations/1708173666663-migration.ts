import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1708173666663 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (2, null, 'Different comment text 1')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, 1, 'Different comment text 2')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (2, 2, 'Different comment text 3')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, 3, 'Different comment text 4')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, 1, 'Different comment text 5')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 6')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (2, null, 'Different comment text 7')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (2, null, 'Different comment text 8')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 9')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 10')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 11')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 12')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 13')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 14')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 15')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 16')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 17')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 18')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 19')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 20')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 21')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 22')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (2, 15, 'Different comment text 23')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 24')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 25')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (2, null, 'Different comment text 26')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 27')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 28')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 29')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 30')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 31')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 32')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (2, null, 'Different comment text 33')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 34')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (2, 12, 'Different comment text 35')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 36')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 37')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (2, null, 'Different comment text 38')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 39')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (2, null, 'Different comment text 40')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 41')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (2, null, 'Different comment text 42')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 43')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, 35, 'Different comment text 44')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (2, null, 'Different comment text 45')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 46')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (2, null, 'Different comment text 47')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, 47, 'Different comment text 48')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (2, null, 'Different comment text 49')`);
    await queryRunner.query(`
        INSERT INTO comments (user_id, parent_comment_id, text)
            VALUES (1, null, 'Different comment text 50')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM comments`);
  }
}
