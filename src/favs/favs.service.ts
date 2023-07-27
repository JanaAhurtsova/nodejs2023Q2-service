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

  createAlbum(albumId: string) {
    const album = db.albums.find(({ id }) => id === albumId);
    if (!album) {
      throw new UnprocessableEntityException(
        `Album with id ${albumId} is not found`,
      );
    }
    if (!db.favorites.albums.includes(albumId)) {
      db.favorites.albums.push(albumId);
    }
    return album;
  }

  removeAlbum(albumId: string) {
    const album = db.albums.find(({ id }) => id === albumId);
    if (!album) {
      throw new NotFoundException(`Album with id ${albumId} is not found`);
    }
    db.favorites.albums = db.favorites.albums.filter((id) => id !== albumId);
  }

  createArtist(artistId: string) {
    const artist = db.artists.find(({ id }) => id === artistId);
    if (!artist) {
      throw new UnprocessableEntityException(
        `Artist with id ${artistId} is not found`,
      );
    }
    if (!db.favorites.artists.includes(artistId)) {
      db.favorites.artists.push(artistId);
    }
    return artist;
  }

  removeArtist(artistId: string) {
    const artist = db.artists.find(({ id }) => id === artistId);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${artistId} is not found`);
    }
    db.favorites.artists = db.favorites.artists.filter((id) => id !== artistId);
  }

  createTrack(trackId: string) {
    const track = db.tracks.find(({ id }) => id === trackId);
    if (!track) {
      throw new UnprocessableEntityException(
        `Track with id ${trackId} is not found`,
      );
    }
    if (!db.favorites.tracks.includes(trackId)) {
      db.favorites.tracks.push(trackId);
    }
    return track;
  }

  removeTrack(trackId: string) {
    const track = db.tracks.find(({ id }) => id === trackId);
    if (!track) {
      throw new NotFoundException(`Track with id ${trackId} is not found`);
    }
    db.favorites.tracks = db.favorites.tracks.filter((id) => id !== trackId);
  }
}
