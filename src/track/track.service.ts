import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import db, { Track } from '../db/db';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    return 'This action adds a new track';
  }

  findAll(): Track[] {
    return db.tracks;
  }

  findOne(id: number) {
    return `This action returns a #${id} track`;
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: number) {
    return `This action removes a #${id} track`;
  }
}
