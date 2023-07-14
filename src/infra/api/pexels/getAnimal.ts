import { getRandomNumber } from 'utils/random';
import { PixelsAPI } from './pixelAxios.config';
import { InversifyContainer } from 'container/inversifyContainer';
import { TYPE_API_CONTAINERS } from 'container/api/apiContainer.type';

/* eslint-disable no-unused-vars */
export enum EAnimal {
  CAT = 'cat',
  DOG = 'dog'
}

export const getAnimal = async (animal: EAnimal) => {
  const API = InversifyContainer.get<PixelsAPI>(TYPE_API_CONTAINERS.PixelsAPI);

  return API.getInstance().get('search', {
    params: {
      query: animal,
      page: getRandomNumber(1, 15),
      per_page: getRandomNumber(1, 15)
    }
  });
};
