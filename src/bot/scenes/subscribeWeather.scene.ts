import { SCENE } from 'bot/constants/scenes.enum';
import { Scenes } from 'telegraf';

const askCity = async (ctx: any) => {
  ctx.reply('Введите город');
  ctx.wizard.state.subscribe_weather = {};
  return ctx.wizard.next();
};

const askTime = async (ctx: any) => {
  ctx.wizard.state.subscribe_weather.city = ctx.message.text;
  ctx.reply('Введите время');
  return ctx.wizard.next();
};

const exctractData = async (ctx: any) => {
  ctx.wizard.state.subscribe_weather.time = ctx.message.text;
  console.log('res: ', ctx.wizard.state);
  return ctx.scene.leave();
};

export const subscribeOnWeatherScene = new Scenes.WizardScene<any>(
  SCENE.SUBSCRIBE_ON_WEATHER,
  askCity,
  askTime,
  exctractData
);
