import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreatePutawayRuleDto {
  @IsString()
  @MaxLength(200)
  name: string;

  @IsOptional()
  @IsString()
  criteria?: string;

  @IsOptional()
  @IsUUID()
  targetZoneId?: string;

  @IsOptional()
  @IsInt()
  priority?: number;
}

export class CreatePickingRuleDto {
  @IsString()
  @MaxLength(200)
  name: string;

  @IsString()
  @MaxLength(50)
  strategy: string;

  @IsOptional()
  @IsString()
  criteria?: string;
}
