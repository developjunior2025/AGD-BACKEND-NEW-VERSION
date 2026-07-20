import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CargoFile } from './entities/cargo-file.entity';
import { CargoFileParty } from './entities/cargo-file-party.entity';
import { CargoFileDocument } from './entities/cargo-file-document.entity';
import { CargoFileChecklist } from './entities/cargo-file-checklist.entity';
import { CargoFileChecklistItem } from './entities/cargo-file-checklist-item.entity';
import { CargoFileMilestone } from './entities/cargo-file-milestone.entity';
import { CargoFileStatusHistory } from './entities/cargo-file-status-history.entity';
import { CargoFileAlert } from './entities/cargo-file-alert.entity';
import { CargoFilesService } from './cargo-files.service';
import { CargoFilesController } from './cargo-files.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CargoFile,
      CargoFileParty,
      CargoFileDocument,
      CargoFileChecklist,
      CargoFileChecklistItem,
      CargoFileMilestone,
      CargoFileStatusHistory,
      CargoFileAlert,
    ]),
  ],
  controllers: [CargoFilesController],
  providers: [CargoFilesService],
  exports: [CargoFilesService],
})
export class CargoFilesModule {}
