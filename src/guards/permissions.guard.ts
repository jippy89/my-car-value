import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { CaslAbilityFactory, Subjects } from "src/casl/casl-ability.factory/casl-ability.factory";
import { PERMISSIONS_KEY, PermissionType } from "src/decorators/permissions.decorator";
import { Action } from "src/enums/actions.enum";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const handler = context.getHandler()
    const controller = context.getClass()

    // Logs out the method and class that is being called
    // console.log('handler', handler)
    // console.log('controller', controller)
    
    const permission = this.reflector.getAllAndOverride<{
      action: Action,
      entity: Subjects
    }>(PERMISSIONS_KEY, [
      handler,
      controller,
    ])

    // If no roles metadata exists, then return true
    if (!permission) {
      return true
    }

    const { currentUser } = context.switchToHttp().getRequest()
    const ability = this.caslAbilityFactory.createForCurrentUser(currentUser)
    const result = ability.can(permission.action, permission.entity)
    return result
  }
}