import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthenticationModule } from "./authentication/authentication.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DbService } from "./db/db.service";
import { DbController } from "./db/db.controller";
import { DbModule } from "./db/db.module";
import { UtilsModule } from "./utils/utils.module";
import { UtilsController } from "./utils/utils.controller";
import { UtilsService } from "./utils/utils.service";

@Module({
  imports: [
    AuthenticationModule,
    DbModule,
    UtilsModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController, DbController, UtilsController],
  providers: [AppService, DbService, UtilsService],
})
export class AppModule {}
