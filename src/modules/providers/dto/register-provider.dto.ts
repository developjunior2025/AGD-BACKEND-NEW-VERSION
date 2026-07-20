import { IsOptional, IsString, IsUUID } from 'class-validator';

export class RegisterProviderDto {
  @IsUUID()
  organizationId: string;

  @IsOptional()
  @IsString()
  description?: string;
}
