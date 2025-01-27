export class Plant {
  id: string;
  name: string;
  type: string;
  species: string;
  last_watered: string;
  next_watering: string;
  location: string;
  watering_frequency: string;

  constructor(
    id: string,
    name: string,
    type: string,
    species: string,
    last_watered: string,
    next_watering: string,
    location: string,
    watering_frequency: string
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

  calcNextWateringDate(): void {
    if (!this.last_watered) return null;
    const lastWateredCopy = new Date(this.last_watered + "T00:00:00");
    lastWateredCopy.setDate(
      lastWateredCopy.getDate() + parseInt(this.watering_frequency)
    );
    this.next_watering = lastWateredCopy.toLocaleDateString();
  }
}
