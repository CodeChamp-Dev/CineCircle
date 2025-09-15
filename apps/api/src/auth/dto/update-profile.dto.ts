import { IsString, IsOptional, Length, IsUrl } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  @Length(1, 100)
  displayName?: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;
}