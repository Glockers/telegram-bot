import { injectable } from 'inversify';

export interface ISubscribeService {
  getSubscriptions: () => void;
  deleteWeather: (data: any) => void;
  subscibeOnWeather: (data: any) => void;
}

@injectable()
export class SubscribeService implements ISubscribeService {
  getSubscriptions() {}

  deleteWeather(data: any) {
    console.log('delete ', data);
  }

  subscibeOnWeather(data: any) {
    console.log('subscribe ', data);
  }
}
