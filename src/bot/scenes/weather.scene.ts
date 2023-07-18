import { Scenes } from 'telegraf';
import { IBotContext } from '../context/context.interface';

export const weatherScene = new Scenes.BaseScene<IBotContext>('weather');
