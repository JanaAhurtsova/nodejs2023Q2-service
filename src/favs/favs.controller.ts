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

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post(':category/:id')
  create(
    @Param('category') category: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.favsService.create(id, category);
  }

  @Delete(':category/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('category') category: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.favsService.remove(id, category);
  }
}
