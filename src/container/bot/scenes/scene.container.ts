import { HelpScene } from 'bot/scenes/help/help.scene';
import { IContainer, InversifyContainer } from 'container/inversifyContainer';
import { TYPE_SCENES_CONTAINERS } from './scenes.type';

export class SceneContainer implements IContainer {
  initContainer() {
    InversifyContainer.bind<HelpScene>(TYPE_SCENES_CONTAINERS.HelpScene).to(HelpScene);
  }
}
