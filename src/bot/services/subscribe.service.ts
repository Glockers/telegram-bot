import { injectable } from 'inversify';

export interface ISubscribeService {
  getSubscriptions: () => void;
  deleteWeather: () => void;
  subscibeOnWeather: () => void;
}

@injectable()
export class SubscribeService implements ISubscribeService {
  getSubscriptions() {}

  deleteWeather() {}

  subscibeOnWeather() {}
}
