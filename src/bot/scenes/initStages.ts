import { Scenes } from 'telegraf';
import { weatherScene } from './weather.scene';

export const stage = new Scenes.Stage<Scenes.SceneContext>([
  weatherScene
], {
  ttl: 24 * 60 * 60
});
