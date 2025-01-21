export class Plant {
  id: string;
  name: string;
  type: EPlantType;
  species: string;
  last_watered: Date;
  next_watering: Date;
  location: string;
  watering_frequency: number;

  constructor(
    id: string,
    name: string,
    type: EPlantType,
    species: string,
    last_watered: Date,
    next_watering: Date,
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

  calcNextWateringDate(): void {
    const newDate = new Date();
    newDate.setDate(this.last_watered.getDate() + this.watering_frequency);
    this.next_watering = newDate;
  }
}

export enum EPlantType {
  indoor = "Indoor",
  outdoor = "Outdoor",
}