import { SCENE } from 'bot/constants/scenes.enum';
import { IBotContext } from 'bot/context/context.interface';
import { Scenes } from 'telegraf';

export const weatherScene = new Scenes.BaseScene<IBotContext>(SCENE.WEATHER);
