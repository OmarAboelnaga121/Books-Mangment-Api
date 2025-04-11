import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Books Management API')
    .setDescription('API documentation for the Books Management system')
    .setVersion('1.0')
    .addBearerAuth() // Add JWT Bearer token support
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
