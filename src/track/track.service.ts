import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { db } from '../db/db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const track = {
      id: uuidv4(),
      artistId: null,
      albumId: null,
      ...createTrackDto,
    };
    db.tracks.push(track);
    return track;
  }

  findAll() {
    return db.tracks;
  }

  findOne(id: string) {
    const track = db.tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException(`Track with id ${id} is not found`);
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackIndex = db.tracks.findIndex((track) => track.id === id);
    const availableIndex = 0;

    if (trackIndex < availableIndex) {
      throw new NotFoundException(`Track with id ${id} is not found`);
    }

    const updatedTrack = {
      ...db.tracks[trackIndex],
      ...updateTrackDto,
    };
    db.tracks[trackIndex] = updatedTrack;

    return updatedTrack;
  }

  remove(id: string) {
    const track = db.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} is not found`);
    }
    db.tracks = db.tracks.filter((track) => track.id !== id);
    db.favorites.tracks = db.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
  }
}
