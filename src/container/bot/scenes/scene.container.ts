import { HelpScene } from 'bot/scenes/help/help.scene';
import { IContainer, InversifyContainer } from 'container/inversifyContainer';
import { TYPE_SCENES_CONTAINERS } from './scenes.type';
import { ISceneBehave } from 'bot/scenes/scene.type';
import { SubscribeTaskScene } from 'bot/scenes/task/subscribe.scene';

export class SceneContainer implements IContainer {
  initContainer() {
    InversifyContainer.bind<HelpScene>(TYPE_SCENES_CONTAINERS.HelpScene).to(HelpScene);
    InversifyContainer.bind<ISceneBehave>(TYPE_SCENES_CONTAINERS.SubscribeTaskScene).to(SubscribeTaskScene);
  }
}
