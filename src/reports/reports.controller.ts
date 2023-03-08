import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthenticationGuard)
  createReport (@Body() body: CreateReportDto) {
    return this.reportsService.create(body);
  }
}
