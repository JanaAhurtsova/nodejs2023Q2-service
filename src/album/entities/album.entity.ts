import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Album {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  year: number;
  @ApiPropertyOptional()
  artistId: string | null;
}
