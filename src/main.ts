import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';

dotenv.config();

const PORT = Number(process.env.PORT);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const document = await readFile('./doc/api.yaml', { encoding: 'utf-8' });
  SwaggerModule.setup('doc', app, parse(document));

  await app.listen(PORT || 4000, () => {
    console.log(`Server starts on port ${PORT}`);
  });
}
bootstrap();
