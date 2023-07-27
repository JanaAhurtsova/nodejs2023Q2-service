import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';
import { db } from '../db/db';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    const defaultVersion = 1;
    const user = {
      id: uuidv4(),
      ...createUserDto,
      version: defaultVersion,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    db.users.push(user);
    return new User(user);
  }

  async findAll() {
    return db.users.map((user) => new User(user));
  }

  async findOne(id: string) {
    const user = db.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} is not found`);
    }
    return new User(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { oldPassword, newPassword } = updateUserDto;
    const userIndex = db.users.findIndex((user) => user.id === id);
    const availableIndex = 0;

    if (userIndex < availableIndex) {
      throw new NotFoundException(`User with id ${id} is not found`);
    }

    if (db.users[userIndex].password !== oldPassword) {
      throw new ForbiddenException('Old password is invalid');
    }

    const version = db.users[userIndex].version + 1;

    const updatedUser = {
      ...db.users[userIndex],
      version: version,
      password: newPassword,
      updatedAt: Date.now(),
    };

    db.users[userIndex] = updatedUser;

    return new User(updatedUser);
  }

  async remove(id: string) {
    const user = db.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} is not found`);
    }
    db.users = db.users.filter((user) => user.id !== id);
  }
}
