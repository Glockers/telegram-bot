const allCommandContainers = {
  // Command: Symbol.for('Command'),
  AnimalCommand: Symbol.for('AnimalCommand'),
  GreetingCommand: Symbol.for('GreetingCommand'),
  WeatherCommand: Symbol.for('WeatherCommand'),
  SubscribeCommand: Symbol.for('SubscribeCommand')
};

export const TYPE_COMMAND_CONTAINERS = {
  ...allCommandContainers,
  UnknownCommand: Symbol.for('UnknownCommand')
};
