import { IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateOrganizationRoleDto {
  @IsString()
  @MaxLength(100)
  code: string;

  @IsString()
  @MaxLength(150)
  name: string;

  @IsOptional()
  @IsObject()
  permissions?: Record<string, boolean>;
}
