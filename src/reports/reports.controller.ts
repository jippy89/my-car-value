import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.createEstimate(query)
  }

  @Post()
  @UseGuards(AuthenticationGuard)
  @Serialize(ReportDto)
  createReport (@Body() body: CreateReportDto, @CurrentUser() user) {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: number, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved);
  }
}
