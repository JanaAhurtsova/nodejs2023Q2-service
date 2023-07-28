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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Artist } from './entities/artist.entity';

@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @ApiOperation({
    summary: 'Add new artist',
    description: 'Add new artist to the library',
  })
  @ApiCreatedResponse({ description: 'Artist is created', type: Artist })
  @ApiBadRequestResponse({
    description: 'Bad request. Body does not contain required fields',
  })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all artists',
    description: 'Get all artist',
  })
  @ApiOkResponse({ description: 'Successful operation', type: [Artist] })
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':ArtistId')
  @ApiOperation({
    summary: 'Get single artist',
    description: 'Get single artist by ArtistId',
  })
  @ApiOkResponse({ description: 'Successful operation', type: Artist })
  @ApiBadRequestResponse({
    description: 'Bad request. ArtistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist was not found' })
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'ArtistId',
  })
  findOne(@Param('ArtistId', new ParseUUIDPipe()) id: string) {
    return this.artistService.findOne(id);
  }

  @Put(':ArtistId')
  @ApiOperation({
    summary: 'Update artist information',
    description: 'Update artist information by ArtistId',
  })
  @ApiOkResponse({ description: 'The artist has been updated', type: Artist })
  @ApiBadRequestResponse({
    description: 'Bad request. ArtistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist was not found' })
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'ArtistId',
  })
  update(
    @Param('ArtistId', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':ArtistId')
  @ApiOperation({
    summary: 'Delete artist',
    description: 'Delete artist from library by ArtistId',
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
  remove(@Param('ArtistId', new ParseUUIDPipe()) id: string) {
    return this.artistService.remove(id);
  }
}
