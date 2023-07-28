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
import { Album } from './entities/album.entity';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiOperation({
    summary: 'Add new album',
    description: 'Add new album information',
  })
  @ApiCreatedResponse({ description: 'Album is created', type: Album })
  @ApiBadRequestResponse({
    description: 'Bad request. Body does not contain required fields',
  })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get albums list',
    description: 'Get all library albums list',
  })
  @ApiOkResponse({ description: 'Successful operation', type: [Album] })
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':AlbumId')
  @ApiOperation({
    summary: 'Get single album by id',
    description: 'Get single album by id',
  })
  @ApiOkResponse({ description: 'Successful operation', type: Album })
  @ApiBadRequestResponse({
    description: 'Bad request. AlbumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'AlbumId',
  })
  findOne(@Param('AlbumId', new ParseUUIDPipe()) id: string) {
    return this.albumService.findOne(id);
  }

  @Put(':AlbumId')
  @ApiOperation({
    summary: 'Update album information',
    description: 'Update library album information by AlbumId',
  })
  @ApiOkResponse({ description: 'The album has been updated', type: Album })
  @ApiBadRequestResponse({
    description: 'Bad request. AlbumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'AlbumId',
  })
  update(
    @Param('AlbumId', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':AlbumId')
  @ApiOperation({
    summary: 'Delete album',
    description: 'Delete album from library by AlbumId',
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
  remove(@Param('AlbumId', new ParseUUIDPipe()) id: string) {
    return this.albumService.remove(id);
  }
}
