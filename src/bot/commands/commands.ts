import { AbstactCommand } from './command.class';
import { inject, injectable } from 'inversify';
import { TYPE_COMMAND_CONTAINERS } from 'container/commands/command.type';

// TODO Добавить типизацию
// TODO поменять DI

export interface ICommand {
  getInstanceCommands: () => AbstactCommand[]
}

@injectable()
export class Command implements ICommand {
  private commands: AbstactCommand[] = [];

  constructor(
    @inject(TYPE_COMMAND_CONTAINERS.AnimalCommand) animalCommand: AbstactCommand,
    @inject(TYPE_COMMAND_CONTAINERS.GreetingCommand) greetingCommand: AbstactCommand,
    @inject(TYPE_COMMAND_CONTAINERS.UnknownCommand) unknownCommand: AbstactCommand
  ) {
    this.commands.unshift(unknownCommand);
    this.commands.unshift(animalCommand);
    this.commands.unshift(greetingCommand);
  }

  getInstanceCommands(): AbstactCommand[] {
    return this.commands;
  };
}
