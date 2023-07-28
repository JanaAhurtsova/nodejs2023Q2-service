import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    type: 'string',
    example: 'string',
  })
  oldPassword: string;
  @ApiProperty({
    type: 'string',
    example: 'newPassword',
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
