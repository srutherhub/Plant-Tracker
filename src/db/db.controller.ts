import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "src/authentication/authentication.guard";
import { DbService } from "./db.service";
import { Plant } from "src/models/plant";

@Controller("db")
export class DbController {
  constructor(private readonly dbService: DbService) {}

  @Get("getplants")
  @UseGuards(AuthGuard)
  async getPlants(@Query("id") id: string) {
    return this.dbService.getPlants(id);
  }

  @Post("addplant")
  @UseGuards(AuthGuard)
  async addPlant(@Body() body: { input: Plant }, @Query("id") id: string) {
    return this.dbService.addPlant(body.input, id);
  }

  @Delete("deleteplant")
  @UseGuards(AuthGuard)
  async deletePlant(@Body() body: { id: string }, @Query("id") id: string) {
    return this.dbService.deletePlant(body.id, id);
  }

  @Patch("updateplant")
  @UseGuards(AuthGuard)
  async updatePlant(
    @Body() body: { id: string; input: Plant },
    @Query("id") id: string
  ) {
    return this.dbService.updatePlant(body.id, body.input, id);
  }
}
