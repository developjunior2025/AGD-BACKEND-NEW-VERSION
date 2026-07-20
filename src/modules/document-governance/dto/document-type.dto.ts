import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateDocumentTypeDto {
  @IsString()
  @MaxLength(100)
  code: string;

  @IsString()
  @MaxLength(200)
  name: string;

  @IsString()
  @MaxLength(100)
  moduleOrigin: string;

  @IsOptional()
  @IsString()
  description?: string;
}
