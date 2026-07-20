import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';

export class SendToProvidersDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  providerProfileIds: string[];
}
