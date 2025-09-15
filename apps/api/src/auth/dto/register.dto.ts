import { IsString, IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  clerkId!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  username!: string;

  @IsString()
  @IsOptional()
  @Length(1, 100)
  displayName?: string;
}