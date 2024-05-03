import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

import { BotService } from './bot.service';

@Controller(`bot6614402380:AAHh-Nqh-cIXNI4rwdfnJftu2OIKWWp5tf4`)
export class BotController {
  constructor(private botService: BotService) {}

  @Post()
  async botMessage(@Req() req: Request, @Res() res: Response) {
    this.botService.handleUpdate(req.body);
    return res.status(HttpStatus.OK);
  }
}
