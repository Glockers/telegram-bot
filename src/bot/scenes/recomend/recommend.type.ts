import { Kinds } from 'infra/api/recommend/place.type';

export interface SessionPlace {
  kinds: Kinds;
  city: string;
}
