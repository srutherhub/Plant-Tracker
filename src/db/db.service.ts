import { Injectable } from "@nestjs/common";
import { AuthenticationService } from "src/authentication/authentication.service";
import { Plant } from "src/models/plant";

@Injectable()
export class DbService {
  constructor(private readonly authenticationService: AuthenticationService) {}

  async getPlants(userId: string, sort: number) {
    if (!userId) throw new Error("No ID provided");
    const supabase = await this.authenticationService.dbConnection();
    const { data, error } = await supabase
      .from("plants")
      .select("*")
      .eq("user_id", userId)
      .order(Plant.getPlantColfromNum(sort), { ascending: true });
    if (error) {
      throw new Error(error.message);
    }
    if (data.length === 0) return null;

    return data;
  }

  async addPlant(input: Plant, userId: string) {
    if (!userId) throw new Error("No ID provided");
    const supabase = await this.authenticationService.dbConnection();

    input = Plant.getNewPlant(input);
    input.calcNextWateringDate();

    const { data, error } = await supabase
      .from("plants")
      .insert(input)
      .eq("user_id", userId);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async deletePlant(id: string, userId: string) {
    if (!userId) throw new Error("No ID provided");
    const supabase = await this.authenticationService.dbConnection();
    const { error } = await supabase
      .from("plants")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);
    if (error) {
      throw new Error(error.message);
    }
    return true;
  }

  async updatePlant(id: string, input, userId: string) {
    if (!userId) throw new Error("No ID provided");
    const supabase = await this.authenticationService.dbConnection();
    const removeEmptyProps = (obj) => {
      return Object.fromEntries(
        Object.entries(obj).filter(
          ([key, value]) =>
            value !== null && value !== "" && value !== undefined
        )
      );
    };

    input = removeEmptyProps(input);
    input = Plant.getNewPlant(input);
    input.calcNextWateringDate();

    const { data, error } = await supabase
      .from("plants")
      .update(input)
      .eq("id", id)
      .eq("user_id", userId)
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}
