import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // solo me acepta lo definido en el DTO (ignora)
      forbidNonWhitelisted: true, // alerta y devuelve 403 bad request
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
