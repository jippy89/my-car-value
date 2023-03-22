import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/decorators/roles.decorator";
import { Role } from "src/enums/roles.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('roles.guard.ts')
    const handler = context.getHandler()
    const controller = context.getClass()

    // Logs out the method and class that is being called
    // console.log('handler', handler)
    // console.log('controller', controller)
    
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      handler,
      controller,
    ])

    // If no roles metadata exists, then return true
    if (!requiredRoles) {
      return true
    }

    const { currentUser } = context.switchToHttp().getRequest()
    console.log('currentUser', currentUser)
    return requiredRoles.some((role) => {
      if (!currentUser.roles) return false
      return currentUser.roles?.includes(role)
    })
  }
}