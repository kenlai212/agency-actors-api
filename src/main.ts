import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppLogger } from './app.logger';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule, {
    //logger: new AppLogger()
  });

  ////////////////////middle ware
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));

  const config = new DocumentBuilder()
    .setTitle(process.env.APP_TITLE || '')
    .addServer(process.env.SWAGGER_SERVER_PREFIX || '')
    .setDescription(process.env.DESCRIPTION || '')
    .setVersion(process.env.VERSION || '0.0.0')
    .addTag('Agency Actor API', 'Manage the life cycle of the Agency Actor, including details and assets')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, documentFactory);

  ////////////////////start server
  const port = process.env.PORT || 8080;
  await app.listen(port, '0.0.0.0', () => {
    logger.log(`Express web server started: http://localhost:${port}`);
  });
}

bootstrap();