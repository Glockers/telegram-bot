import { Scenes } from 'telegraf';
import { weatherScene } from './weather/weather.scene';
import { TYPE_SCENES_CONTAINERS } from 'container/scenes/scenes.type';
import { InversifyContainer } from 'container/inversifyContainer';
import { ISceneBehave } from './scene.type';

export class Stage {
  private scenes: any[] = [];

  init() {
    Object.keys(TYPE_SCENES_CONTAINERS).forEach((key) => {
      const command =
        TYPE_SCENES_CONTAINERS[key as keyof typeof TYPE_SCENES_CONTAINERS];
      this.scenes.push(
        InversifyContainer.get<ISceneBehave>(command).getInstance()
      );
    });

    // TODO переписать weatherScene
    return new Scenes.Stage<any>([...this.scenes, weatherScene], {
      ttl: 24 * 60 * 60 // TODO вынести
    });
  }
}
