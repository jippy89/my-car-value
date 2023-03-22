import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../users/user.entity';

export default setSeederFactory(User, (faker) => {
    const user = new User();
    user.username = faker.internet.email();
    // Roles can be null, or admin, or user and can be multiple all in one string separated by commas
    user.roles = faker.helpers.arrayElement([null, 'admin', 'user', 'admin,user']);
    user.password = faker.internet.password();
    return user;
})
