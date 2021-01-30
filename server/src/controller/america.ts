import { Inject, Controller, Provide ,Get,Query} from '@midwayjs/decorator';
import { Context } from 'egg';
import {AmericaService} from "../service/america";


@Provide()
@Controller('/america')
export class AmericaController {

  @Inject()
  ctx: Context;

  @Inject()
  americaService:AmericaService;

  @Get('/')
  async home() {
    return 'Hello america!';
  }

  @Get('/date')
  async getDataByDate(@Query('y') y: string,@Query('date') date: string) {
    const result=await this.americaService.getDataByDate(y,date);
    return result;
  }
}
