import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':ArtistId')
  findOne(@Param('ArtistId', new ParseUUIDPipe()) id: string) {
    return this.artistService.findOne(id);
  }

  @Put(':ArtistId')
  update(
    @Param('ArtistId', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':ArtistId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('ArtistId', new ParseUUIDPipe()) id: string) {
    return this.artistService.remove(id);
  }
}
