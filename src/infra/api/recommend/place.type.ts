interface Geometry {
  type: string;
  coordinates: [number, number];
}

interface Properties {
  xid: string;
  name: string;
  dist: number;
  rate: number;
  osm: string;
  kinds: string;
}

export interface Feature {
  type: string;
  id: string;
  geometry: Geometry;
  properties: Properties;
}

export interface FeatureCollection {
  type: string;
  features: Feature[];
}

export interface ICountryData {
  name: string,
  lat: number,
  lon: number
}

/* eslint-disable no-unused-vars */
export enum Kinds {
  CAFE = 'cafes',
  ATTRACTIONS = 'tourist_object',
  THEATRES_AND_ENTERTAINMENTS = 'theatres_and_entertainments',
  SHOPS = 'shops',
  BANKS = 'banks'
}
