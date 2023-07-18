import { TYPE_API_CONTAINERS } from 'container/api/apiContainer.type';
import { EAnimal, PixelsAPI } from 'infra/api/pexels/pixelAxios.config';
import { inject, injectable } from 'inversify';

export interface IAnimalService {
  getRandmonAnimal: (message: string) => Promise<string | null>
}

@injectable()
export class AnimalService implements IAnimalService {
  private pixelAPI: PixelsAPI;

  // eslint-disable-next-line no-useless-constructor
  constructor(@inject(TYPE_API_CONTAINERS.PixelsAPI) pixelAPI: PixelsAPI) {
    this.pixelAPI = pixelAPI;
  }

  async getRandmonAnimal(message: string): Promise<string | null> {
    const selectedCommand = message;
    const animal = await this.pixelAPI.getAnimal(selectedCommand as EAnimal);
    const animalImage: string = animal.data!.photos[0]!.url;
    return animalImage ?? null;
  };
}
