import { Expose, Type } from "class-transformer";
import { UserDto } from "src/users/dtos/user.dto";

export class ReportDto {
  @Expose()
  id: number;
  @Expose()
  price: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  year: number;
  @Expose()
  lng: number;
  @Expose()
  lat: number;
  @Expose()
  mileage: number;

  @Type(() => UserDto)
  @Expose()
  user: UserDto;
}