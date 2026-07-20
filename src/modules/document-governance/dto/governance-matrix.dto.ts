import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import {
  GovernanceAccessLevel,
  GovernanceAction,
} from '../enums/document-governance.enums';

export class CreateMatrixDto {
  @IsString()
  @MaxLength(200)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class AddMatrixRuleDto {
  @IsString()
  @MaxLength(100)
  profileType: string;

  @IsOptional()
  @IsUUID()
  documentTypeId?: string;

  @IsEnum(GovernanceAction)
  action: GovernanceAction;

  @IsEnum(GovernanceAccessLevel)
  accessLevel: GovernanceAccessLevel;

  @IsOptional()
  @IsString()
  conditions?: string;
}
