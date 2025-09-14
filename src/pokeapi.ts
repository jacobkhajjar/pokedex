import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  pokeCache: Cache;

  constructor() {
    this.pokeCache = new Cache(500)
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? PokeAPI.baseURL + "/location-area";
    const cached = this.pokeCache.get<ShallowLocations>(url)

    if (cached !== undefined) {
      return cached;
    }

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        const locations: ShallowLocations = await response.json();

        this.pokeCache.add(url, locations)

        return locations;

    } catch (e) {
        throw new Error(`Error fetching locations: ${(e as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    // implement this
    return null;
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = null;