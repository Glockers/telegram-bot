import { Container } from 'inversify';
import { AnimalContainer } from './animals/animal.container';
import { APIContainer } from './api/api.container';
import { BotContainer } from './bot/bot.container';
import { CommandContainer } from './commands/command.container';
import { WeatherContainer } from './weather/weather.container';
import { TaskContainer } from './task/task.container';

export interface IContainer {
  initContainer: () => void;
}

const InversifyContainer = new Container({
  skipBaseClassChecks: true,
  autoBindInjectable: true
});

const containerCollection: IContainer[] = [
  new AnimalContainer(),
  new APIContainer(),
  new BotContainer(),
  new CommandContainer(),
  new WeatherContainer(),
  new TaskContainer()
];

for (const container of containerCollection) {
  container.initContainer();
}

export { InversifyContainer };
