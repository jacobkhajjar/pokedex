import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  pokeCache: Cache;

  constructor(cacheInterval: number) {
    this.pokeCache = new Cache(cacheInterval)
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
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const cached = this.pokeCache.get<Location>(url)

    if (cached !== undefined) {
      return cached;
    }

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        const location: Location = await response.json();

        this.pokeCache.add(url, location)

        return location;

    } catch (e) {
        throw new Error(`Error fetching locations: ${(e as Error).message}`);
    }
  }
};

export type ShallowLocations = {
  count: number
  next: string
  previous: any
  results: Array<{
    name: string
    url: string
  }>
};

export type Location = {
  encounter_method_rates: Array<{
    encounter_method: {
      name: string
      url: string
    }
    version_details: Array<{
      rate: number
      version: {
        name: string
        url: string
      }
    }>
  }>
  game_index: number
  id: number
  location: {
    name: string
    url: string
  }
  name: string
  names: Array<{
    language: {
      name: string
      url: string
    }
    name: string
  }>
  pokemon_encounters: Array<{
    pokemon: {
      name: string
      url: string
    }
    version_details: Array<{
      encounter_details: Array<{
        chance: number
        condition_values: Array<any>
        max_level: number
        method: {
          name: string
          url: string
        }
        min_level: number
      }>
      max_chance: number
      version: {
        name: string
        url: string
      }
    }>
  }>
}