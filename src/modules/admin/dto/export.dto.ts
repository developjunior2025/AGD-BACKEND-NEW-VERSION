import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsObject,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class ExportColumnDto {
  @IsString()
  @MaxLength(100)
  key: string;

  @IsString()
  @MaxLength(150)
  header: string;
}

export class ExportToExcelDto {
  @IsString()
  @MaxLength(100)
  sheetName: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ExportColumnDto)
  columns: ExportColumnDto[];

  @IsArray()
  @IsObject({ each: true })
  rows: Record<string, unknown>[];
}
