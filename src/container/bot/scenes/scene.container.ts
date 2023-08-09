import { IContainer, InversifyContainer } from '@container/inversifyContainer';
import { TYPE_SCENES_CONTAINERS } from './scenes.type';
import { ISceneBehave } from '@bot/scenes';
import { SubscribeTaskScene } from '@bot/scenes/task';
import { RecommendScene } from '@bot/scenes/recomend';

export class SceneContainer implements IContainer {
  initContainer(): void {
    InversifyContainer.bind<ISceneBehave>(TYPE_SCENES_CONTAINERS.SubscribeTaskScene).to(SubscribeTaskScene);
    InversifyContainer.bind<ISceneBehave>(TYPE_SCENES_CONTAINERS.RecommendScene).to(RecommendScene);
  }
}
