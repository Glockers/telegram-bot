import { IContainer } from 'container/container.type';
import { InversifyContainer } from 'container/inversifyContainer';
import { TYPE_COMMAND_CONTAINERS } from './command.type';
import { Command, ICommand } from 'bot/commands/commands';
import { AnimalCommand } from 'bot/commands/animal.command';
import { AbstactCommand } from 'bot/commands/command.class';
import { GreetingCommand } from 'bot/commands/greeting.command';
import { UnknownCommand } from 'bot/commands/unknown.command';
import { WeatherCommand } from 'bot/commands/weather.command';

export class CommandContainer implements IContainer {
  initContainer() {
    InversifyContainer.bind<ICommand>(TYPE_COMMAND_CONTAINERS.Command).to(Command);
    InversifyContainer.bind<AbstactCommand>(TYPE_COMMAND_CONTAINERS.AnimalCommand).to(AnimalCommand);
    InversifyContainer.bind<AbstactCommand>(TYPE_COMMAND_CONTAINERS.GreetingCommand).to(GreetingCommand);
    InversifyContainer.bind<AbstactCommand>(TYPE_COMMAND_CONTAINERS.WeatherCommand).to(WeatherCommand);
    InversifyContainer.bind<AbstactCommand>(TYPE_COMMAND_CONTAINERS.UnknownCommand).to(UnknownCommand);
  }
}
