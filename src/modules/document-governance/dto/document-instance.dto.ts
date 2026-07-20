import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateDocumentInstanceDto {
  @IsUUID()
  documentTypeId: string;

  @IsOptional()
  @IsUUID()
  templateId?: string;

  @IsString()
  @MaxLength(100)
  code: string;

  @IsString()
  @MaxLength(200)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  sourceEntityType?: string;

  @IsOptional()
  @IsUUID()
  sourceEntityId?: string;

  @IsOptional()
  @IsString()
  fileUrl?: string;
}

export class DecideDocumentDto {
  @IsOptional()
  @IsString()
  comments?: string;
}

export class AddDocumentObservationDto {
  @IsString()
  observation: string;
}

export class AddDocumentRemediationDto {
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  evidenceUrl?: string;
}

export class SignDocumentDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  method?: string;

  @IsOptional()
  @IsString()
  signatureReference?: string;
}
