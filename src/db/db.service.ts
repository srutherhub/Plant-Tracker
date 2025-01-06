import { Injectable } from "@nestjs/common";
import { AuthenticationService } from "src/authentication/authentication.service";
import { Plant } from "src/models/plant";

@Injectable()
export class DbService {
  constructor(private readonly authenticationService: AuthenticationService) {}

  async getPlants() {
    const supabase = await this.authenticationService.dbConnection();
    const { data, error } = await supabase.from("plants").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async addPlant(input: Plant) {
    const supabase = await this.authenticationService.dbConnection();
    const { data, error } = await supabase.from("plants").insert(input);
    console.log(error);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async deletePlant(id: string) {
    const supabase = await this.authenticationService.dbConnection();
    const { error } = await supabase.from("plants").delete().eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return true;
  }

  async updatePlant(id: string, input: Plant) {
    const supabase = await this.authenticationService.dbConnection();
    const { data, error } = await supabase
      .from("plants")
      .update(input)
      .eq("id", id)
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}
