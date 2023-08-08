import { IContainer, InversifyContainer } from '@container/inversifyContainer';
import { TYPE_COMMAND_CONTAINERS } from './command.type';
import {
  AnimalCommand, GreetingCommand,
  UnknownCommand, WeatherCommand,
  SubscribeCommand, TaskCommand
} from '@bot/commands';
import { AbstactCommand } from '@bot/interfaces';

export class CommandContainer implements IContainer {
  initContainer(): void {
    InversifyContainer.bind<AbstactCommand>(TYPE_COMMAND_CONTAINERS.AnimalCommand).to(AnimalCommand);
    InversifyContainer.bind<AbstactCommand>(TYPE_COMMAND_CONTAINERS.GreetingCommand).to(GreetingCommand);
    InversifyContainer.bind<AbstactCommand>(TYPE_COMMAND_CONTAINERS.WeatherCommand).to(WeatherCommand);
    InversifyContainer.bind<AbstactCommand>(TYPE_COMMAND_CONTAINERS.SubscribeCommand).to(SubscribeCommand);
    InversifyContainer.bind<AbstactCommand>(TYPE_COMMAND_CONTAINERS.TaskCommand).to(TaskCommand);
    InversifyContainer.bind<AbstactCommand>(TYPE_COMMAND_CONTAINERS.UnknownCommand).to(UnknownCommand);
  }
}
