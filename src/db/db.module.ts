import { Module } from "@nestjs/common";
import { DbController } from "./db.controller";
import { DbService } from "./db.service";
import { AuthenticationModule } from "src/authentication/authentication.module";

@Module({
  imports: [AuthenticationModule],
  controllers: [DbController],
  providers: [DbService],
})
export class DbModule {}
