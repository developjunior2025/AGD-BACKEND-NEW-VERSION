import { IsOptional, IsUUID } from 'class-validator';

export class AddFavoriteDto {
  @IsOptional()
  @IsUUID()
  providerProfileId?: string;

  @IsOptional()
  @IsUUID()
  logisticsServiceId?: string;
}
