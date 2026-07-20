import {
  IsArray,
  IsBoolean,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateDocumentTemplateDto {
  @IsUUID()
  documentTypeId: string;

  @IsString()
  @MaxLength(200)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  format?: string;
}

export class AddTemplateFieldDto {
  @IsString()
  @MaxLength(150)
  fieldKey: string;

  @IsString()
  @MaxLength(200)
  fieldLabel: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  fieldType?: string;

  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  options?: string[];

  @IsOptional()
  @IsInt()
  displayOrder?: number;
}

export class AddTemplateRuleDto {
  @IsString()
  @MaxLength(50)
  ruleType: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsObject()
  config?: Record<string, unknown>;
}
