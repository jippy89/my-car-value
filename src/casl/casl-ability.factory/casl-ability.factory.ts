import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects, defineAbility } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Action } from "src/enums/actions.enum";
import { Report } from "src/reports/report.entity";
import { User } from "src/users/user.entity";
import { Role } from "src/enums/roles.enum";

export type Subjects = InferSubjects<typeof Report | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {

  createForCurrentUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>
      (Ability as AbilityClass<AppAbility>);

    if (!user.roles) can(Action.Read, 'all')

    // Permissions for all resources
    if (Array.isArray(user.roles)) {
      const roles = user.roles.filter(role => role.name === Role.Admin)
      if (roles.length > 0) {
        can(Action.Manage, 'all')
      }
    } else if (typeof user.roles === 'object') {
      if (user.roles.admin) {
        can(Action.Manage, 'all')
      }
    }

    // Permissions for Report resource
    can(Action.Update, Report, { user: { id: user.id } })
    cannot(Action.Delete, Report, { approved: true })

    return build({
      detectSubjectType: item =>
        item.constructor as ExtractSubjectType<Subjects>
    })
  }

}
