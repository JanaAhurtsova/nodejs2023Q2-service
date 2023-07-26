import { IsNotEmpty } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty({ each: true })
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}
