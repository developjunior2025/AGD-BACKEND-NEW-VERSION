import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FurType } from './entities/fur-type.entity';
import { FurRecord } from './entities/fur-record.entity';
import { FurVersion } from './entities/fur-version.entity';
import { FurField } from './entities/fur-field.entity';
import { FurApproval } from './entities/fur-approval.entity';
import { FurObservation } from './entities/fur-observation.entity';
import { FurAttachment } from './entities/fur-attachment.entity';
import { FurHistory } from './entities/fur-history.entity';
import { FurTypesService } from './fur-types.service';
import { FurRecordsService } from './fur-records.service';
import { FurTypesController } from './fur-types.controller';
import { FurRecordsController } from './fur-records.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FurType,
      FurRecord,
      FurVersion,
      FurField,
      FurApproval,
      FurObservation,
      FurAttachment,
      FurHistory,
    ]),
  ],
  controllers: [FurTypesController, FurRecordsController],
  providers: [FurTypesService, FurRecordsService],
  exports: [FurTypesService, FurRecordsService],
})
export class FurModule {}
