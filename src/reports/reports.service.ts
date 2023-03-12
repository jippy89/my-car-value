import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportsRepository: Repository<Report>,
  ) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.reportsRepository.create(reportDto);
    report.user = user
    return this.reportsRepository.save(report);
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.reportsRepository.findOneBy({ id });
    if (!report) {
      throw new NotFoundException('Report not found');
    }

    report.approved = approved;
    return this.reportsRepository.save(report);
  }

  async createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
    return this.reportsRepository.createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      // Adds the above `where` statement instead of replacing it.
      .andWhere('model = :model', { model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne()
  }
}
