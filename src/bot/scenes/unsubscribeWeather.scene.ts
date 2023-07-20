import { SCENE } from 'bot/constants/scenes.enum';
import { ISubscribeService } from 'bot/services/subscribe.service';
import { InversifyContainer } from 'container/inversifyContainer';
import { Scenes } from 'telegraf';

interface ISceneBehave {
  getInstance: () => Scenes.WizardScene<any>;
}

export class UnsubscribeOnWeatherScene implements ISceneBehave {
  scene: Scenes.WizardScene<any>;
  //   service: ISubscribeService;

  constructor() {
    console.log(InversifyContainer);
    // this.service = InversifyContainer.get()
    this.scene = new Scenes.WizardScene<any>(
      SCENE.UNSUBSCRIBE_FROM_WEATHER,
      this.askID,
      this.exctractData
    );
  }

  getInstance() {
    return this.scene;
  }

  private askID = async (ctx: any) => {
    ctx.reply('Введите ID подписки');
    ctx.wizard.state.subscribe_weather = {};
    return ctx.wizard.next();
  };

  private exctractData = async (ctx: any) => {
    ctx.wizard.state.subscribe_weather.id = ctx.message.text;
    console.log('res: ', ctx.wizard.state);
    return ctx.scene.leave();
  };
}
