/**
 * @file Represents user's response data
 */
import { Expose, Transform, Type } from "class-transformer";
import { Role } from "src/roles/role.entity";

class UserRoleDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
}


export class UserDto {
  @Expose()
  id: string;
  @Expose()
  username: string;
  
  // Turn to { admin: { id: 1, name: 'admin' }, user: { id: 2, name: 'user' }
  @Transform(({ obj }) => {
    return obj.roles.reduce((acc, role: Role) => {
      acc[role.name] = {
        id: role.id,
        name: role.name
      }
      return acc;
    }, {})
  })
  @Expose()
  roles: Record<string,UserRoleDto>;
}