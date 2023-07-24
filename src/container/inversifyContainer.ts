import { Container } from 'inversify';
import { AnimalContainer } from './bot/animals/animal.container';
import { APIContainer } from './api/api.container';
import { BotContainer } from './bot/bot.container';
import { CommandContainer } from './bot/commands/command.container';
import { WeatherContainer } from './bot/weather/weather.container';
import { TaskContainer } from './bot/task/task.container';
import { ConfigContainer } from './config/config.container';
import { RepositoryContainer } from './repository/repository.container';

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
  new TaskContainer(),
  new ConfigContainer(),
  new RepositoryContainer()
];

for (const container of containerCollection) {
  container.initContainer();
}

export { InversifyContainer };
