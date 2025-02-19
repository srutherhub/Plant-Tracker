export class Plant {
  id: string;
  name: string;
  type: EPlantType;
  species: string;
  last_watered: string;
  next_watering: string;
  location: string;
  watering_frequency: number;

  constructor(
    id: string,
    name: string,
    type: EPlantType,
    species: string,
    last_watered: string,
    next_watering: string,
    location: string,
    watering_frequency: number
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.species = species;
    this.last_watered = last_watered;
    this.next_watering = next_watering;
    this.location = location;
    this.watering_frequency = watering_frequency;
  }
  static getNewPlant(input: Plant): Plant {
    return new Plant(
      input.id,
      input.name,
      input.type,
      input.species,
      input.last_watered,
      input.next_watering,
      input.location,
      input.watering_frequency
    );
  }

  getLastWateredDate(): string {
    if (this.last_watered) {
      return new Date(this.last_watered + "T00:00:00").toLocaleDateString(
        "en-us"
      );
    } else return "";
  }

  getNextWateringDate(): string {
    if (this.next_watering) {
      return new Date(this.next_watering + "T00:00:00").toLocaleDateString(
        "en-us"
      );
    } else return "";
  }

  isWateringReqToday(): boolean {
    const nextWateringrDate = new Date(this.getNextWateringDate());
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    if (nextWateringrDate <= todayDate) return true;
    else return false;
  }
}

export enum EPlantType {
  indoor = "Indoor",
  outdoor = "Outdoor",
}
