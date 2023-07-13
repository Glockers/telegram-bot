import { TYPE_CONTAINERS } from 'container/typeContainers';
import { getRandomNumber } from 'utils/random';
import { PixelsAPI } from './pixelAxios.config';
import { InversifyContainer } from 'container/inversifyContainer';

/* eslint-disable no-unused-vars */
export enum EAnimal {
  CAT = 'cat',
  DOG = 'dog'
}

export const getAnimal = async (animal: EAnimal) => {
  const API = InversifyContainer.get<PixelsAPI>(TYPE_CONTAINERS.PixelsAPI);

  return API.getInstance().get('search', {
    params: {
      query: animal,
      page: getRandomNumber(1, 15),
      per_page: getRandomNumber(1, 15)
    }
  });
};
