export class Plant {
  id: string;
  name: string;
  type: string;
  species: string;
  last_watered: Date;
  next_watering: Date;
  location: string;

  Constructor(
    id: string,
    name: string,
    type: string,
    species: string,
    last_watered: Date,
    next_watering: Date,
    location: string
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.species = species;
    this.last_watered = last_watered;
    this.next_watering = next_watering;
    this.location = location;
  }
}
