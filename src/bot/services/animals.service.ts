import { TYPE_API_CONTAINERS } from '@container/api';
import { Animals, PixelsAPI } from '@infra/api';
import { inject, injectable } from 'inversify';

export interface IAnimalService {
  getRandmonAnimal: (message: string) => Promise<string | null>
}

@injectable()
export class AnimalService implements IAnimalService {
  private readonly pixelAPI: PixelsAPI;

  constructor(@inject(TYPE_API_CONTAINERS.PixelsAPI) pixelAPI: PixelsAPI) {
    this.pixelAPI = pixelAPI;
  }

  async getRandmonAnimal(message: string): Promise<string | null> {
    const selectedCommand = message;
    const animal = await this.pixelAPI.getAnimal(selectedCommand as Animals);
    const animalImage: string = animal.photos[0]!.url;
    return animalImage ?? null;
  };
}
