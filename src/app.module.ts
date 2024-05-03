import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BotController } from './bot/bot.controller';
import { BotService } from './bot/bot.service';
import { PrismaService } from './prisma.servise';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, BotController],
  providers: [BotService, PrismaService, AppService],
})
export class AppModule {}
