import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WmsProduct } from './entities/wms-product.entity';
import { WmsSku } from './entities/wms-sku.entity';
import { WmsLot } from './entities/wms-lot.entity';
import { WmsSerial } from './entities/wms-serial.entity';
import { WmsWarehouse } from './entities/wms-warehouse.entity';
import { WmsZone } from './entities/wms-zone.entity';
import { WmsRack } from './entities/wms-rack.entity';
import { WmsLocation } from './entities/wms-location.entity';
import { WmsReceipt } from './entities/wms-receipt.entity';
import { WmsReceiptItem } from './entities/wms-receipt-item.entity';
import { WmsInventoryBalance } from './entities/wms-inventory-balance.entity';
import { WmsInventoryMovement } from './entities/wms-inventory-movement.entity';
import { WmsInventoryReservation } from './entities/wms-inventory-reservation.entity';
import { WmsCycleCount } from './entities/wms-cycle-count.entity';
import { WmsInventoryAdjustment } from './entities/wms-inventory-adjustment.entity';
import { WmsPutawayRule } from './entities/wms-putaway-rule.entity';
import { WmsPickingRule } from './entities/wms-picking-rule.entity';
import { WmsPickingOrder } from './entities/wms-picking-order.entity';
import { WmsPackingOrder } from './entities/wms-packing-order.entity';
import { WmsDispatchOrder } from './entities/wms-dispatch-order.entity';
import { WmsDispatchEvidence } from './entities/wms-dispatch-evidence.entity';
import { WmsTask } from './entities/wms-task.entity';
import { WmsCatalogService } from './wms-catalog.service';
import { WmsInventoryService } from './wms-inventory.service';
import { WmsFulfillmentService } from './wms-fulfillment.service';
import { WmsCatalogController } from './wms-catalog.controller';
import { WmsInventoryController } from './wms-inventory.controller';
import { WmsFulfillmentController } from './wms-fulfillment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WmsProduct,
      WmsSku,
      WmsLot,
      WmsSerial,
      WmsWarehouse,
      WmsZone,
      WmsRack,
      WmsLocation,
      WmsReceipt,
      WmsReceiptItem,
      WmsInventoryBalance,
      WmsInventoryMovement,
      WmsInventoryReservation,
      WmsCycleCount,
      WmsInventoryAdjustment,
      WmsPutawayRule,
      WmsPickingRule,
      WmsPickingOrder,
      WmsPackingOrder,
      WmsDispatchOrder,
      WmsDispatchEvidence,
      WmsTask,
    ]),
  ],
  controllers: [
    WmsCatalogController,
    WmsInventoryController,
    WmsFulfillmentController,
  ],
  providers: [WmsCatalogService, WmsInventoryService, WmsFulfillmentService],
  exports: [WmsCatalogService, WmsInventoryService, WmsFulfillmentService],
})
export class WmsModule {}
