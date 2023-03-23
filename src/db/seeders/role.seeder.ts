import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Role } from 'src/roles/role.entity';

export default class RoleSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
  ): Promise<any> {
    const repository = dataSource.getRepository(Role);
    await repository.insert([
      {
        name: 'admin'
      },
      {
        name: 'user'
      }
    ]);
  }
}
