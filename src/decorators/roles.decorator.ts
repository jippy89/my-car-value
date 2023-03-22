import { SetMetadata } from "@nestjs/common";
import { Role } from "src/enums/roles.enum";

export const ROLES_KEY = 'roles';

// With this in place, we can create a @Roles() decorator.
// This decorator allows specifying what roles are required to
// access specific resources.
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);