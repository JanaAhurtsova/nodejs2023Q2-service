import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  oldPassword: string;
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
