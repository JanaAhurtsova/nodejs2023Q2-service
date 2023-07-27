import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { db } from '../db/db';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class FavsService {
  @Inject(ArtistService)
  private artistService: ArtistService;
  @Inject(AlbumService)
  private albumService: AlbumService;
  @Inject(TrackService)
  private trackService: TrackService;

  findAll() {
    const artists = db.favorites.artists.map((artistId) =>
      this.artistService.findOne(artistId),
    );
    const albums = db.favorites.albums.map((albumId) =>
      this.albumService.findOne(albumId),
    );
    const tracks = db.favorites.tracks.map((trackId) =>
      this.trackService.findOne(trackId),
    );

    return { artists: artists, albums: albums, tracks: tracks };
  }

  create(id: string, category: string) {
    const item = db[`${category}s`].find((categ) => categ.id === id);
    if (!item) {
      throw new UnprocessableEntityException(
        `${category} with id ${id} is not found`,
      );
    }
    if (!db.favorites[`${category}s`].includes(id)) {
      db.favorites[`${category}s`].push(id);
    }
    return item;
  }

  remove(id: string, category: string) {
    const item = db[`${category}s`].find((categ) => categ.id === id);
    if (!item) {
      throw new NotFoundException(`${category} with id ${id} is not found`);
    }
    db.favorites[`${category}s`] = db.favorites[`${category}s`].filter(
      (categoryId) => categoryId !== id,
    );
  }
}
