import { IsOptional, IsUUID } from 'class-validator';

export class InviteMemberDto {
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsUUID()
  organizationRoleId?: string;
}
