import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import ExcelJS from 'exceljs';
import { MarketplaceUserProfile } from '../identity/entities/marketplace-user-profile.entity';
import { MarketplaceOrganization } from '../identity/entities/marketplace-organization.entity';
import { ProviderProfile } from '../providers/entities/provider-profile.entity';
import { CargoFile } from '../cargo-files/entities/cargo-file.entity';
import { CargoFileStatus } from '../cargo-files/enums/cargo-file.enums';
import { LogisticsOrder } from '../orders/entities/logistics-order.entity';
import { LogisticsOrderStatus } from '../orders/enums/order.enums';
import { ExportToExcelDto } from './dto/export.dto';

export interface DashboardSummary {
  totalUsers: number;
  totalOrganizations: number;
  totalProviders: number;
  activeCargoFiles: number;
  ordersInProgress: number;
  generatedAt: Date;
}

/** Reportes ejecutivos y exportaciones (§6.10 "Reportes ejecutivos", "Exportaciones"). */
@Injectable()
export class AdminReportsService {
  constructor(
    @InjectRepository(MarketplaceUserProfile)
    private readonly userRepository: Repository<MarketplaceUserProfile>,
    @InjectRepository(MarketplaceOrganization)
    private readonly organizationRepository: Repository<MarketplaceOrganization>,
    @InjectRepository(ProviderProfile)
    private readonly providerRepository: Repository<ProviderProfile>,
    @InjectRepository(CargoFile)
    private readonly cargoFileRepository: Repository<CargoFile>,
    @InjectRepository(LogisticsOrder)
    private readonly orderRepository: Repository<LogisticsOrder>,
  ) {}

  async getDashboardSummary(): Promise<DashboardSummary> {
    const [
      totalUsers,
      totalOrganizations,
      totalProviders,
      activeCargoFiles,
      ordersInProgress,
    ] = await Promise.all([
      this.userRepository.count(),
      this.organizationRepository.count(),
      this.providerRepository.count(),
      this.cargoFileRepository.count({
        where: {
          status: Not(In([CargoFileStatus.CERRADO, CargoFileStatus.VENCIDO])),
        },
      }),
      this.orderRepository.count({
        where: { status: LogisticsOrderStatus.EN_EJECUCION },
      }),
    ]);

    return {
      totalUsers,
      totalOrganizations,
      totalProviders,
      activeCargoFiles,
      ordersInProgress,
      generatedAt: new Date(),
    };
  }

  /** Exportación genérica a Excel (§3 ExcelJS) reutilizable por cualquier listado del sistema. */
  async exportToExcel(dto: ExportToExcelDto): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet(dto.sheetName);

    sheet.columns = dto.columns.map((column) => ({
      header: column.header,
      key: column.key,
      width: Math.max(column.header.length + 4, 16),
    }));
    sheet.getRow(1).font = { bold: true };

    dto.rows.forEach((row) => sheet.addRow(row));

    const arrayBuffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(arrayBuffer);
  }
}
