import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

import { BotService } from './bot.service';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

const BOT_API_TOKEN = configService.get('BOT_API_TOKEN');

@Controller(`bot${BOT_API_TOKEN}`)
export class BotController {
  constructor(private botService: BotService) {}

  @Post()
  async botMessage(@Req() req: Request, @Res() res: Response) {
    this.botService.handleUpdate(req.body);
    return res.status(HttpStatus.OK);
  }
}
