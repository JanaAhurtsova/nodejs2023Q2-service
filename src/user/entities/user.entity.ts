import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class User {
  @ApiProperty()
  id: string;
  @ApiProperty()
  login: string;
  @ApiPropertyOptional()
  version: number;
  @ApiPropertyOptional()
  createdAt: number;
  @ApiPropertyOptional()
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
