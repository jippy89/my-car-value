/**
 * @file Represents user's response data
 */
import { Expose } from "class-transformer";

export class UserDto {
  @Expose()
  id: string;
  @Expose()
  username: string;
}