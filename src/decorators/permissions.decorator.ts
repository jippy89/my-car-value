import { SetMetadata } from "@nestjs/common";
import { Action } from "src/enums/actions.enum";
import { EntityMetadata } from "typeorm";

export const PERMISSIONS_KEY = 'permissions';
export type PermissionType<T> = { action: Action; entity: T };

// With this in place, we can create a @Permission() decorator.
// This decorator allows specifying what roles are required to
// access specific resources.
export function Permission<T>(action: Action, entity: T) {
  return SetMetadata(PERMISSIONS_KEY, { action, entity });
}