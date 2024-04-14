import { Injectable, OnModuleInit } from '@nestjs/common';
import TelegramBot = require('node-telegram-bot-api');
import { PrismaService } from 'src/prisma.servise';

@Injectable()
export class BotService implements OnModuleInit {
  bot = null;
  constructor(private readonly prisma: PrismaService) {
    this.bot = new TelegramBot(process.env.BOT_API_TOKEN, {
      webHook: {
        port: 3000
      }
    });
  }

  async onModuleInit() {
    this.bot.setWebHook(`http://localhost:3000/bot${process.env.BOT_API_TOKEN}`)
    await this.botMessage();
    await this.setCommands();
  }

  async botMessage() {
    this.bot.on(
      'new_chat_members', 
      (msg) => this.bot.sendMessage(
        msg.chat.id,
        `Привет, ${msg.new_chat_members[0].first_name}! Добро пожаловать в чат Edudi! Если тебе нужна помощь, то задай свой вопрос`
      ))
    this.bot.onText(/\/love/, (msg) => {
      const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
          keyboard: [
            ['Yes, you are the bot of my life ❤'],
            ['No, sorry there is another one...']
          ]
        })
      };
      this.bot.sendMessage(msg.chat.id, 'Do you love me?', opts);
    });
  }

  async setCommands() {
    this.bot.setMyCommands([
      {command: 'get_free_access', description: 'gave free access'},
      {command: 'love', description: 'gave free access'}
    ])
  }
}
