import { Inject, Controller, Provide ,Get} from '@midwayjs/decorator';
import { Context } from 'egg';
import {ChinaService} from "../service/china";


@Provide()
@Controller('/china')
export class ChinaController {

  @Inject()
  ctx: Context;

  @Inject()
  chinaService:ChinaService;

  @Get('/')
  async home() {
    return 'Hello china!';
  }

  @Get('/province')
  async getProvince() {
    const data=await this.chinaService.getProvince();
    return data;
  }
}
