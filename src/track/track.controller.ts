import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':TrackId')
  findOne(@Param('TrackId', new ParseUUIDPipe()) id: string) {
    return this.trackService.findOne(id);
  }

  @Put(':TrackId')
  update(
    @Param('TrackId', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':TrackId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('TrackId', new ParseUUIDPipe()) id: string) {
    return this.trackService.remove(id);
  }
}
