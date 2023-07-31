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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':AlbumId')
  findOne(@Param('AlbumId', new ParseUUIDPipe()) id: string) {
    return this.albumService.findOne(id);
  }

  @Put(':AlbumId')
  update(
    @Param('AlbumId', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':AlbumId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('AlbumId', new ParseUUIDPipe()) id: string) {
    return this.albumService.remove(id);
  }
}
