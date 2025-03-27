import { Body, Controller, Get, Query, UseGuards } from "@nestjs/common";
import { UtilsService } from "./utils.service";
import { AuthGuard } from "src/authentication/authentication.guard";

@Controller("utils")
export class UtilsController {
  constructor(private readonly utilsService: UtilsService) {}

  @Get("getweather")
  @UseGuards(AuthGuard)
  async getWeather(@Query("lat") lat: number, @Query("lon") lon: number) {
    return this.utilsService.getWeather(lat, lon);
  }
}
