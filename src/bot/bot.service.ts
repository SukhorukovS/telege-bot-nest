import { Injectable, OnModuleInit } from '@nestjs/common';
import TelegramBot = require('node-telegram-bot-api');
import { PrismaService } from 'src/prisma.servise';

@Injectable()
export class BotService implements OnModuleInit {
  bot = null;
  constructor(private readonly prisma: PrismaService) {
    this.bot = new TelegramBot(
      '6614402380:AAHh-Nqh-cIXNI4rwdfnJftu2OIKWWp5tf4',
      { polling: true },
    );
  }

  async onModuleInit() {
    await this.setCommands();
    await this.botMessage();
  }

  async botMessage() {
    this.bot.on('message', async (msg) => {
      console.log(msg);
    });
    this.bot.onText(/\/start/, (msg) =>
      this.bot.sendMessage(msg.chat.id, `Привет, ${msg.from.first_name}!`),
    );
    this.bot.onText(/\/love/, (msg) => {
      console.log(msg);
      const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
          keyboard: [
            ['Yes, you are the bot of my life ❤'],
            ['No, sorry there is another one...'],
          ],
        }),
      };
      this.bot.sendMessage(msg.chat.id, 'Do you love me?', opts);
    });
  }

  async setCommands() {
    this.bot.setMyCommands([
      { command: 'get_free_access', description: 'gave free access' },
      { command: 'love', description: 'gave free access' },
    ]);
  }

  handleUpdate(update: any) {
    this.bot.processUpdate(update);
  }
}
