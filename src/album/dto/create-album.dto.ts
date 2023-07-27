import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({
    type: 'string',
    example: 'Nevermind',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'integer',
    example: 1991,
  })
  @IsInt()
  year: number;

  @ApiPropertyOptional({
    type: 'string',
    format: 'uuid',
    nullable: true,
    example: '0a35dd62-e09f-444b-a628-f4e7c6954f57',
  })
  @IsOptional()
  artistId: string | null;
}
