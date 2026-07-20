import { IsUUID } from 'class-validator';

export class AddRelatedServiceDto {
  @IsUUID()
  relatedServiceId: string;
}
