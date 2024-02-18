import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1708103742669 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // USERS
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL,
            site_url VARCHAR(255),
            UNIQUE (id),
            UNIQUE (email),
            UNIQUE (username)
        )
    `);

    // PROFILE
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS profile (
            user_id SERIAL PRIMARY KEY,
            password_hash VARCHAR(255) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            UNIQUE (user_id)
        )
    `);

    // COMMENTS
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS comments (
            id SERIAL PRIMARY KEY,
            user_id INT NOT NULL,
            parent_comment_id INT DEFAULT NULL,
            text TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (parent_comment_id) REFERENCES comments(id) ON DELETE CASCADE,
            UNIQUE (id)
        )
    `);

    // FILES
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS files (
            id SERIAL PRIMARY KEY,
            container_name VARCHAR(255) NOT NULL,
            blob_name VARCHAR(255) NOT NULL,
            file_url VARCHAR(255) NOT NULL,
            uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE (id),
            UNIQUE (container_name, blob_name)
        );
    `);

    // COMMENT_ATTACHMENTS
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS comment_attachments (
            comment_id INT NOT NULL,
            file_id INT NOT NULL,
            PRIMARY KEY (comment_id, file_id),
            FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
            FOREIGN KEY (file_id) REFERENCES files(id) ON DELETE CASCADE
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS comment_attachments
    `);
    await queryRunner.query(`
        DROP TABLE IF EXISTS comments
    `);
    await queryRunner.query(`
        DROP TABLE IF EXISTS files
    `);
    await queryRunner.query(`
        DROP TABLE IF EXISTS profile
    `);
    await queryRunner.query(`
        DROP TABLE IF EXISTS users
    `);
  }
}
