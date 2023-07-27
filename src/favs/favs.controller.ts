import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @ApiOkResponse({ description: 'Successful operation' })
  findAll() {
    return this.favsService.findAll();
  }

  @Post('album/:id')
  @ApiCreatedResponse({ description: 'Album is added to favorites' })
  @ApiBadRequestResponse({
    description: 'Bad request. AlbumId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({ description: 'Album was not found' })
  createAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.createAlbum(id);
  }

  @Delete('album/:id')
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. AlbumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.removeAlbum(id);
  }

  @Post('track/:id')
  @ApiCreatedResponse({ description: 'Track is added to favorites' })
  @ApiBadRequestResponse({
    description: 'Bad request. TrackId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({ description: 'Track was not found' })
  createTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.createTrack(id);
  }

  @Delete('track/:id')
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. TrackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.removeTrack(id);
  }

  @Post('artist/:id')
  @ApiCreatedResponse({ description: 'Artist is added to favorites' })
  @ApiBadRequestResponse({
    description: 'Bad request. ArtistId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({ description: 'Artist was not found' })
  createArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.createArtist(id);
  }

  @Delete('artist/:id')
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. ArtistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.removeArtist(id);
  }
}
