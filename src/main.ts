import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const allowedOrigins = process.env.FRONTEND_URL.split(',');

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  await app.listen(3000);
  console.log(`Server is running on port 3000`);
}
bootstrap();
