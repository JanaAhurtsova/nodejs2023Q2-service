import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/db';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    db.artists.push(artist);
    return artist;
  }

  findAll() {
    return db.artists;
  }

  findOne(id: string) {
    const artist = db.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} is not found`);
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistIndex = db.artists.findIndex((artist) => artist.id === id);
    const availableIndex = 0;

    if (artistIndex < availableIndex) {
      throw new NotFoundException(`Artist with id ${id} is not found`);
    }

    const updatedArtist = {
      id,
      ...updateArtistDto,
    };

    db.artists[artistIndex] = updatedArtist;
    return updatedArtist;
  }

  remove(id: string) {
    const artist = db.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} is not found`);
    }

    db.favorites.artists = db.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
    db.tracks = db.tracks.map((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
      return track;
    });
    db.albums = db.albums.map((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
      return album;
    });
    db.artists = db.artists.filter((artist) => artist.id !== id);
  }
}
