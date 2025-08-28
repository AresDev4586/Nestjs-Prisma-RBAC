import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//DATABASE_URL="postgresql://postgres:0000@localhost:5432/test_tenant?schema=public"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //app.setGlobalPrefix('api'); // Añadir un prefijo global para todas las rutas de la API

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000); // Usar process.env.PORT o 3000 como fallback
}
bootstrap();
