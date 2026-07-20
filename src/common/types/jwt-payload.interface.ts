import { ProfileType } from '../enums/profile-type.enum';

export interface JwtPayload {
  sub: string;
  email: string;
  profileType: ProfileType;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  profileType: ProfileType;
}
