import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreatePickingOrderDto {
  @IsUUID()
  lotId: string;
}

export class CreateDispatchOrderDto {
  @IsUUID()
  lotId: string;

  @IsOptional()
  @IsUUID()
  pickingOrderId?: string;
}

export class AuthorizeAgdReleaseDto {
  @IsUUID()
  lotId: string;

  @IsString()
  @MaxLength(100)
  releaseNumber: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class RecordDeliveryDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  receivedBy?: string;

  @IsOptional()
  @IsString()
  evidenceUrl?: string;
}

export class CloseAgdOperationDto {
  @IsOptional()
  @IsString()
  summary?: string;
}
