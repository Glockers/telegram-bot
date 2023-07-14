import { Container } from 'inversify';
import { IContainer } from './container.type';
import { AnimalContainer } from './animals/animal.container';
import { APIContainer } from './api/api.container';
import { BotContainer } from './bot/bot.container';
import { CommandContainer } from './commands/command.container';
import { WeatherContainer } from './weather/weather.container';

const InversifyContainer = new Container({ skipBaseClassChecks: true });

const containerCollection: IContainer[] = [
  new AnimalContainer(),
  new APIContainer(),
  new BotContainer(),
  new CommandContainer(),
  new WeatherContainer()
];

for (const container of containerCollection) {
  container.initContainer();
}

export { InversifyContainer };
