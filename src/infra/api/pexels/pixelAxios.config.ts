import { injectable } from 'inversify';
import axios from 'axios';
import { API } from 'infra/api/api.class';
import { getRandomNumber } from 'utils/random';

/* eslint-disable no-unused-vars */
export enum EAnimal {
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

  getAnimal(animal: EAnimal) {
    return this.getInstance().get('search', {
      params: {
        query: animal,
        page: getRandomNumber(1, 15),
        per_page: getRandomNumber(1, 15)
      }
    });
  };

  getInstance() {
    return this.axiosInstance;
  }
}
