import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { GateEventType } from '../enums/port.enums';

export class CreateContainerDto {
  @IsString()
  @MaxLength(50)
  containerNumber: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  containerType?: string;

  @IsOptional()
  @IsInt()
  sizeFeet?: number;
}

export class CreateDischargeOrderDto {
  @IsDateString()
  orderedAt: string;
}

export class AddDischargeEventDto {
  @IsOptional()
  @IsUUID()
  containerId?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class MoveContainerDto {
  @IsUUID()
  containerId: string;

  @IsOptional()
  @IsUUID()
  fromSlotId?: string;

  @IsUUID()
  toSlotId: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  reason?: string;
}

export class RegisterGateEventDto {
  @IsUUID()
  containerId: string;

  @IsEnum(GateEventType)
  eventType: GateEventType;

  @IsOptional()
  @IsUUID()
  transportOrderId?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class AuthorizeContainerReleaseDto {
  @IsUUID()
  containerId: string;

  @IsString()
  @MaxLength(100)
  releaseNumber: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
