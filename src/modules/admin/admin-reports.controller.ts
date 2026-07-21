import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { Roles } from '../../common/decorators/roles.decorator';
import { ProfileType } from '../../common/enums/profile-type.enum';
import { AdminReportsService } from './admin-reports.service';
import { ExportToExcelDto } from './dto/export.dto';

@ApiTags('Administración - Reportes')
@ApiBearerAuth()
@Roles(ProfileType.SUPERADMINISTRADOR)
@Controller('admin-reports')
export class AdminReportsController {
  constructor(private readonly adminReportsService: AdminReportsService) {}

  @Get('dashboard')
  getDashboardSummary() {
    return this.adminReportsService.getDashboardSummary();
  }

  @Post('export')
  async exportToExcel(@Body() dto: ExportToExcelDto, @Res() res: Response) {
    const buffer = await this.adminReportsService.exportToExcel(dto);
    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${dto.sheetName}.xlsx"`,
    });
    res.send(buffer);
  }
}
