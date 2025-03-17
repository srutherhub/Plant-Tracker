import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      "https://localhost:5173",
      "https://localhost:3000",
      "https://localhost:4173",
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:4173",
    ],
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
