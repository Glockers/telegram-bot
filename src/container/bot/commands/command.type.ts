const allCommandContainers = {
  AnimalCommand: Symbol.for('AnimalCommand'),
  GreetingCommand: Symbol.for('GreetingCommand'),
  WeatherCommand: Symbol.for('WeatherCommand'),
  SubscribeCommand: Symbol.for('SubscribeCommand'),
  TaskCommand: Symbol.for('TaskCommand')
};

export const TYPE_COMMAND_CONTAINERS = {
  ...allCommandContainers,
  UnknownCommand: Symbol.for('UnknownCommand')
};
