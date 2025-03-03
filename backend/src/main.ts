import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as process from "node:process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<string>('port');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Smart Money App API')
    .setDescription('This is API for my project')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: configService.get<string>('cors_origin'), // Разрешите только этот источник
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Разрешённые методы
    credentials: true, // Если нужно передавать куки
  });
  await app.listen(port || 5000);
}
bootstrap().catch((err) => {
  console.error('Failed to start the application:', err);
});
