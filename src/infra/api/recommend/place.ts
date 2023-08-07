import { injectable } from 'inversify';
import axios, { AxiosInstance } from 'axios';
import { API } from 'infra/api/api.class';
import { FeatureCollection, ICountryData, KindsPlace } from './place.type';

@injectable()
export class RecommendAPI extends API {
  private readonly BASE_URL = 'https://api.opentripmap.com';

  private readonly URL_CORD = '/0.1/en/places/geoname';

  private readonly URL_PLACES = '/0.1/en/places/radius';

  constructor() {
    super();
    this.axiosInstance = axios.create({
      baseURL: this.BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  private async getСordByCity(city: string): Promise<ICountryData> {
    const data = await this.getInstance().get<ICountryData>(this.URL_CORD, {
      params: {
        apikey: this.configService.get('RECOMMEND_TOKEN'),
        format: 'json',
        name: city
      }
    });

    return data.data;
  };

  async getPlaces(city: string, kind: KindsPlace): Promise<FeatureCollection> {
    const result = await this.getСordByCity(city);
    const places = await this.getInstance().get<FeatureCollection>(this.URL_PLACES, {
      params: {
        apikey: this.configService.get('RECOMMEND_TOKEN'),
        kinds: kind,
        lat: result.lat,
        lon: result.lon,
        radius: 50000,
        rate: 1,
        limit: 5
      }
    });

    return places.data;
  }

  getInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}
