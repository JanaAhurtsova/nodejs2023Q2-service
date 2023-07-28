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
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all favorites',
    description: 'Get all favorites',
  })
  @ApiOkResponse({ description: 'Successful operation' })
  findAll() {
    return this.favsService.findAll();
  }

  @Post('album/:AlbumId')
  @ApiOperation({
    summary: 'Add album to favorites',
    description: 'Add album to favorites by AlbumId',
  })
  @ApiCreatedResponse({ description: 'Album is added to favorites' })
  @ApiBadRequestResponse({
    description: 'Bad request. AlbumId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({ description: 'Album was not found' })
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'AlbumId',
  })
  createAlbum(@Param('AlbumId', new ParseUUIDPipe()) id: string) {
    return this.favsService.createAlbum(id);
  }

  @Delete('album/:AlbumId')
  @ApiOperation({
    summary: 'Delete album from favorites',
    description: 'Delete album from favorites by AlbumId',
  })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. AlbumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'AlbumId',
  })
  removeAlbum(@Param('AlbumId', new ParseUUIDPipe()) id: string) {
    return this.favsService.removeAlbum(id);
  }

  @Post('track/:TrackId')
  @ApiOperation({
    summary: 'Add track to favorites',
    description: 'Add track to favorites by TrackId',
  })
  @ApiCreatedResponse({ description: 'Track is added to favorites' })
  @ApiBadRequestResponse({
    description: 'Bad request. TrackId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({ description: 'Track was not found' })
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'TrackId',
  })
  createTrack(@Param('TrackId', new ParseUUIDPipe()) id: string) {
    return this.favsService.createTrack(id);
  }

  @Delete('track/:TrackId')
  @ApiOperation({
    summary: 'Delete track from favorites',
    description: 'Delete track from favorites by TrackId',
  })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. TrackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'TrackId',
  })
  removeTrack(@Param('TrackId', new ParseUUIDPipe()) id: string) {
    return this.favsService.removeTrack(id);
  }

  @Post('artist/:ArtistId')
  @ApiOperation({
    summary: 'Add artist to favorites',
    description: 'Add artist to favorites by ArtistId',
  })
  @ApiCreatedResponse({ description: 'Artist is added to favorites' })
  @ApiBadRequestResponse({
    description: 'Bad request. ArtistId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({ description: 'Artist was not found' })
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'ArtistId',
  })
  createArtist(@Param('ArtistId', new ParseUUIDPipe()) id: string) {
    return this.favsService.createArtist(id);
  }

  @Delete('artist/:ArtistId')
  @ApiOperation({
    summary: 'Delete artist from favorites',
    description: 'Delete artist from favorites by ArtistId',
  })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. ArtistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'ArtistId',
  })
  removeArtist(@Param('ArtistId', new ParseUUIDPipe()) id: string) {
    return this.favsService.removeArtist(id);
  }
}
