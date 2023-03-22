import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../users/user.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const repository = dataSource.getRepository(User);
    await repository.insert([
      {
        username: 'caleb.barrows@gmail.com',
        password: 'test',
        roles: 'null',
      }
    ]);

    // ---------------------------------------------------

    const userFactory = await factoryManager.get(User);
    // save 1 factory generated entity, to the database
    await userFactory.save();

    // save 5 factory generated entities, to the database
    await userFactory.saveMany(5);
  }
}
