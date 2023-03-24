import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../users/user.entity';
import { Role } from 'src/roles/role.entity';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt)

/**
 * Creates what it needs to do some basic authorization:
 * 1. Create roles
 * 2. Create users
 */
export default class UserAuthorizationSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const rolesRepository = dataSource.getRepository(Role);

    const [adminRole, userRole] = await rolesRepository.save([
      { name: 'admin' },
      { name: 'user' },
    ])

    const admin = new User();
    admin.username = 'admin@admin.com'

    // Generate a salt for password
    const salt = randomBytes(8).toString('hex')
    
    // Hash the password
    const hash = (await scrypt('admin', salt, 32)) as Buffer
    const hashedPassword = `${salt}.${hash.toString('hex')}`
    admin.password = hashedPassword
    admin.roles = [adminRole]

    await dataSource.manager.save(admin)

  }
}
