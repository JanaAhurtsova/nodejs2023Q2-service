import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'string',
  })
  oldPassword: string;
  @ApiProperty({
    example: 'newPassword',
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
