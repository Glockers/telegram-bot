import { injectable } from 'inversify';
import axios, { AxiosInstance } from 'axios';
import { API } from '@infra/api/api.class';
import { getRandomNumber } from '@common/utils/random';

export enum Animals {
  CAT = 'cat',
  DOG = 'dog'
}

@injectable()
export class PixelsAPI extends API {
  private readonly BASE_URL = 'https://api.pexels.com/v1/';

  constructor() {
    super();
    this.axiosInstance = axios.create({
      baseURL: this.BASE_URL,
      headers: {
        Authorization: this.configService.get('PEXEL_TOKEN'),
        'Content-Type': 'application/json'
      }
    });
  }

  async getAnimal(animal: Animals) {
    const result = await this.getInstance().get('search', {
      params: {
        query: animal,
        page: getRandomNumber(1, 15),
        per_page: getRandomNumber(1, 15)
      }
    });

    return result.data;
  };

  getInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}
