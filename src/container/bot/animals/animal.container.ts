import { AnimalController, IAnimalController } from '@bot/controllers/animal.conroller';
import { AnimalService, IAnimalService } from '@bot/services/animals.service';
import { IContainer, InversifyContainer } from '@container/inversifyContainer';
import { TYPE_ANIMAL_CONTAINERS } from './animalContainer.type';

export class AnimalContainer implements IContainer {
  initContainer(): void {
    InversifyContainer.bind<IAnimalService>(TYPE_ANIMAL_CONTAINERS.AnimalService).to(AnimalService);
    InversifyContainer.bind<IAnimalController>(TYPE_ANIMAL_CONTAINERS.AnimalController).to(AnimalController);
  }
}
