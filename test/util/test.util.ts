import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../../src/mark/enum/user.role.enum';

@Injectable()
export class TestUtil {
  constructor(
    private readonly dataSource: DataSource,
    private jwtService: JwtService,
  ) {}

  async loadDb() {
    const entities = await this.getEntities();
    for (const entity of entities) {
      const entityFile = path.join(
        __dirname,
        `../fixtures/entity/${entity.name}.json`,
      );
      if (fs.existsSync(entityFile)) {
        const data = JSON.parse(fs.readFileSync(entityFile, 'utf8'));
        try {
          const repository = await this.dataSource.getRepository(entity.name);

          await repository
            .createQueryBuilder(entity.name)
            .insert()
            .values(data)
            .execute();
        } catch {
          console.log(`Failed to load ${entity.name}`);
        }
      }
    }
  }

  async cleanDb() {
    const entities = await this.getEntities();

    for (const entity of entities) {
      try {
        const repository = await this.dataSource.getRepository(entity.name);
        await repository.query(`DELETE FROM ${entity.tableName} `);
        await repository.query(
          `DELETE FROM SQLITE_SEQUENCE WHERE name='${entity.tableName}' `,
        );
      } catch (error) {
        throw new Error(`ERROR: Cleaning db: ${error}`);
      }
    }
  }

  public async getEntities() {
    const entities: any = [];
    this.dataSource.entityMetadatas.forEach((x) =>
      entities.push({ name: x.name, tableName: x.tableName }),
    );
    return entities;
  }

  public async realodDb() {
    try {
      await this.cleanDb();
      await this.loadDb();
    } catch (err) {
      throw err;
    }
  }

  async createAdminToken(): Promise<string> {
    const payload = {
      user: {
        id: 1,
        email: 'admin@admin.com',
        roleCode: UserRole.ADMIN,
      },
    };

    return await this.jwtService.signAsync(payload);
  }
}
