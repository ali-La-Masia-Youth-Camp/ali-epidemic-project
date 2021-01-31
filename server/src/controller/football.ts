import { Inject, Controller, Provide ,Get} from '@midwayjs/decorator';
import { Context } from 'egg';
import {FootballService} from "../service/football";


@Provide()
@Controller('/football')
export class FootballController {

  @Inject()
  ctx: Context;

  @Inject()
  footballService:FootballService;

  @Get('/')
  async home() {
    return 'Hello america!';
  }

  @Get('/list')
  async getFootballList() {
    const result=await this.footballService.getFootballList();
    return result;
  }

}
