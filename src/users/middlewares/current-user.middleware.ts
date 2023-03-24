import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../user.entity';
import { Role } from 'src/roles/role.entity';

class ModifiedUser extends User {
  roles: Record<string, Role>
}

// Adds a `currentUser` property to the existing `Request` interface
declare global {
  namespace Express {
    interface Request {
      currentUser?: ModifiedUser;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};
    if (userId) {
      const user = await this.usersService.findOne(userId);
      const modifiedUser: ModifiedUser = {
        ...user,
        roles: {}
      }
      const userRoles = user.roles as Role[];
      modifiedUser.roles = userRoles.reduce((acc, role) => {
        acc[role.name] = role;
        return acc;
      }, {})
      req.currentUser = modifiedUser;
    }
    next();
  }
}