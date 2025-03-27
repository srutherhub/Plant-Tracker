import { Injectable } from "@nestjs/common";

@Injectable()
export class UtilsService {
  async getWeather(lat: number, lon: number) {
    try {
      return fetch(
        `${process.env.WEATHER_URL}lat=${lat}&lon=${lon}&appid=${
          process.env.WEATHER_KEY
        }`
      )
        .then((response) => response.json())
        .then((result) => {
          return result;
        });
    } catch (err) {
      return err;
    }
  }
}
