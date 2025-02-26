import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist : true
  // }))

  const config = new DocumentBuilder()
  .setTitle("Smart Money App API")
  .setDescription("This is API for my project")
  .setVersion("1.0")
  .addTag('API')
  .build()
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document);
  app.enableCors({
    origin: 'http://localhost:3000', // Разрешите только этот источник
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Разрешённые методы
    credentials: true, // Если нужно передавать куки
  });
  await app.listen(port);
}
bootstrap();
