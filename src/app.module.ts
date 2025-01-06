import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthenticationModule } from "./authentication/authentication.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DbService } from "./db/db.service";
import { DbController } from "./db/db.controller";
import { DbModule } from "./db/db.module";

@Module({
  imports: [
    AuthenticationModule,
    DbModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController, DbController],
  providers: [AppService, DbService],
})
export class AppModule {}
