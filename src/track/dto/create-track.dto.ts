import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({
    type: 'string',
    example: 'Smells Like Teen Spirit',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'uuid',
    nullable: true,
    example: '0a35dd62-e09f-444b-a628-f4e7c6954f57',
  })
  @IsOptional()
  artistId: string | null;

  @ApiPropertyOptional({
    type: 'string',
    format: 'uuid',
    nullable: true,
    example: '0a35dd62-e09f-55cb-a678-f4e7c6954f57',
  })
  @IsOptional()
  albumId: string | null;

  @ApiProperty({
    type: 'integer',
    example: 278,
  })
  @IsNotEmpty()
  @IsInt()
  duration: number;
}
