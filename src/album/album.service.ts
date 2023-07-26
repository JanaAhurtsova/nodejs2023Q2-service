import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import db from '../db/db';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const album = {
      id: uuidv4(),
      year: 0,
      artistId: null,
      ...createAlbumDto,
    };
    db.albums.push(album);
    return album;
  }

  findAll() {
    return db.albums;
  }

  findOne(id: string) {
    const album = db.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} is not found`);
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumIndex = db.albums.findIndex((album) => album.id === id);
    const availableIndex = 0;

    if (albumIndex < availableIndex) {
      throw new NotFoundException(`Album with id ${id} is not found`);
    }

    const updatedAlbum = {
      ...db.albums[albumIndex],
      ...updateAlbumDto,
    };
    db.albums[albumIndex] = updatedAlbum;

    return updatedAlbum;
  }

  remove(id: string) {
    const album = db.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} is not found`);
    }
    db.albums = db.albums.filter((album) => album.id !== id);
    db.tracks = db.tracks.map((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
      return track;
    });
    db.favorites.albums = db.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
  }
}
