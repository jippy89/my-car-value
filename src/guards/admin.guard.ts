import { CanActivate, ExecutionContext } from "@nestjs/common";
import { User } from "src/users/user.entity";

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    
    if (!request.currentUser) {
      return false
    }

    const { currentUser }: { currentUser: User } = request;

    return currentUser.admin;
  }
}