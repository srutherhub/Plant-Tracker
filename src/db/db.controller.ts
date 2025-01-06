import { Body, Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { DbService } from "./db.service";
import { Plant } from "src/models/plant";

@Controller("db")
export class DbController {
  constructor(private readonly dbService: DbService) {}

  @Get("getplants")
  async getPlants() {
    return this.dbService.getPlants();
  }

  @Post("addplant")
  async addPlant(@Body() body: { input: Plant }) {
    return this.dbService.addPlant(body.input);
  }

  @Delete("deleteplant")
  async deletePlant(@Body() body: { id: string }) {
    return this.dbService.deletePlant(body.id);
  }

  @Patch("updateplant")
  async updatePlant(@Body() body: { id: string; input: Plant }) {
    return this.dbService.updatePlant(body.id, body.input);
  }
}
