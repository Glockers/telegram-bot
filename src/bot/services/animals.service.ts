import { TYPE_API_CONTAINERS } from 'container/api/apiContainer.type';
import { API } from 'infra/api/api.class';
import { EAnimal, getAnimal } from 'infra/api/pexels/getAnimal';
import { inject, injectable } from 'inversify';

export interface IAnimalService {
  getRandmonAnimal: (message: string) => Promise<string | null>
}

@injectable()
export class AnimalService implements IAnimalService {
  private pixelAPI: API;

  // eslint-disable-next-line no-useless-constructor
  constructor(@inject(TYPE_API_CONTAINERS.PixelsAPI) pixelAPI: API) {
    this.pixelAPI = pixelAPI;
  }

  async getRandmonAnimal(message: string): Promise<string | null> {
    const selectedCommand = message;
    const animal = await getAnimal(selectedCommand as EAnimal);
    const animalImage: string = animal.data!.photos[0]!.url;
    return animalImage ?? null;
  };
}
