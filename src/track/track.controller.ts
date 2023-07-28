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
import { Track } from './entities/track.entity';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiOperation({
    summary: 'Add new track to the library',
    description: 'Add new track information',
  })
  @ApiCreatedResponse({ description: 'Track is created', type: Track })
  @ApiBadRequestResponse({
    description: 'Bad request. Body does not contain required fields',
  })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all tracks',
    description: 'Get all tracks',
  })
  @ApiOkResponse({ description: 'Successful operation', type: [Track] })
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':TrackId')
  @ApiOperation({
    summary: 'Get single track by TrackId',
    description: 'Get single track by TrackId',
  })
  @ApiOkResponse({ description: 'Successful operation', type: Track })
  @ApiBadRequestResponse({
    description: 'Bad request. TrackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track was not found' })
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'TrackId',
  })
  findOne(@Param('TrackId', new ParseUUIDPipe()) id: string) {
    return this.trackService.findOne(id);
  }

  @Put(':TrackId')
  @ApiOperation({
    summary: 'Update track information',
    description: 'Update track information by TrackId',
  })
  @ApiOkResponse({ description: 'The track has been updated', type: Track })
  @ApiBadRequestResponse({
    description: 'Bad request. TrackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track was not found' })
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'TrackId',
  })
  update(
    @Param('TrackId', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':TrackId')
  @ApiOperation({
    summary: 'Delete track by TrackId',
    description: 'Delete track from the library by TrackId',
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
  remove(@Param('TrackId', new ParseUUIDPipe()) id: string) {
    return this.trackService.remove(id);
  }
}
