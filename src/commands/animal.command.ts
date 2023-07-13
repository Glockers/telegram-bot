import { Telegraf } from 'telegraf';
import { Command } from './command.class';
import { EAnimal, getAnimal } from 'api/pexels/getAnimal';

const commnads = ['dog', 'cat'];

export class AnimalCommand extends Command {
  constructor(public bot: Telegraf<any>) {
    super(bot);
  }

  handle(): void {
    this.animalHandle();
  }

  // TODO типизировать
  animalHandle(): void {
    this.bot.command(commnads, async (ctx) => {
      const selectedCommand = ctx.update.message.text.substring(1);
      const animalImage: string = commnads.includes(selectedCommand) ? (await getAnimal(selectedCommand as EAnimal)).data.photos[0].url : null;
      if (animalImage) {
        const replyMessage = await ctx.reply('Получаем картинку...');
        return await ctx.replyWithPhoto(animalImage).then(() => {
          ctx.deleteMessage(replyMessage.message_id);
        });
      }
      return ctx.reply('No image found');
    });
  }
}
