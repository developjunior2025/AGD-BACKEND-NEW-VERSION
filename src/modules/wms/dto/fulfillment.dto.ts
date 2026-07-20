import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreatePickingOrderDto {
  @IsUUID()
  warehouseId: string;
}

export class CreatePackingOrderDto {
  @IsUUID()
  pickingOrderId: string;
}

export class CreateDispatchOrderDto {
  @IsOptional()
  @IsUUID()
  packingOrderId?: string;

  @IsString()
  @MaxLength(100)
  dispatchNumber: string;
}

export class AddDispatchEvidenceDto {
  @IsString()
  evidenceUrl: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateTaskDto {
  @IsString()
  @MaxLength(100)
  taskType: string;

  @IsOptional()
  @IsUUID()
  referenceId?: string;

  @IsOptional()
  @IsUUID()
  assignedTo?: string;
}
