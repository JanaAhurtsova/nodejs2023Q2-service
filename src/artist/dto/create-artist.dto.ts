import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({
    type: 'string',
    example: 'Nirvana',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: 'boolean',
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
