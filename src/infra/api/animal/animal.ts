import { injectable } from 'inversify';
import axios, { AxiosInstance } from 'axios';
import { API } from '@infra/api/api.class';
import { getRandomNumber } from '@common/utils/random';
import { PEXELS_BASE_URL } from '@config/api.config';

export enum Animals {
  CAT = 'cat',
  DOG = 'dog'
}

@injectable()
export class PixelsAPI extends API {
  constructor() {
    super();
    this.axiosInstance = axios.create({
      baseURL: PEXELS_BASE_URL,
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
