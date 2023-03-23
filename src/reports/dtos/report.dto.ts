import { Expose, Type } from "class-transformer";

class ReportUserDto {
  @Expose()
  id: number;
  @Expose()
  username: string;
}

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
  @Expose()
  approved: boolean;

  @Type(() => ReportUserDto)
  @Expose()
  user: ReportUserDto;
}