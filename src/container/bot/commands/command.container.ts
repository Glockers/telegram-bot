import { IContainer, InversifyContainer } from '@container/inversifyContainer';
import { TYPE_COMMAND_CONTAINERS } from './command.type';
import { AnimalCommand } from '@bot/commands/animal.command';
import { AbstactCommand } from '@bot/interfaces/command.class';
import { GreetingCommand } from '@bot/commands/greeting.command';
import { UnknownCommand } from '@bot/commands/unknown.command';
import { WeatherCommand } from '@bot/commands/weather.command';
import { SubscribeCommand } from '@bot/commands/subscribe.command';
import { TaskCommand } from '@bot/commands/task.command';

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
