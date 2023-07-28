import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ClassSerializerInterceptor,
  UseInterceptors,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @ApiOperation({
    summary: 'Create user',
    description: 'Create a new user',
  })
  @ApiCreatedResponse({ description: 'User is registered', type: User })
  @ApiBadRequestResponse({
    description: 'Bad request. Body does not contain required fields',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Get all users',
  })
  @ApiOkResponse({ description: 'Successful operation', type: [User] })
  findAll() {
    return this.userService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':UserId')
  @ApiOperation({
    summary: 'Get single user by UserId',
    description: 'Get single user by UserId',
  })
  @ApiOkResponse({ description: 'Successful operation', type: User })
  @ApiBadRequestResponse({
    description: 'Bad request. UserId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'User was not found' })
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'UserId',
  })
  findOne(@Param('UserId', new ParseUUIDPipe()) id: string) {
    return this.userService.findOne(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':UserId')
  @ApiOperation({
    summary: 'Update user information',
    description: 'Update user information by UserId',
  })
  @ApiForbiddenResponse({ description: 'oldPassword is wrong', type: User })
  @ApiOkResponse({ description: 'The password has been updated' })
  @ApiBadRequestResponse({
    description: 'Bad request. UserId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'User was not found' })
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'UserId',
  })
  update(
    @Param('UserId', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':UserId')
  @ApiOperation({
    summary: 'Delete user by UserId',
    description: 'Delete user from the library by UserId',
  })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. UserId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'User was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'UserId',
  })
  remove(@Param('UserId', new ParseUUIDPipe()) id: string) {
    return this.userService.remove(id);
  }
}
