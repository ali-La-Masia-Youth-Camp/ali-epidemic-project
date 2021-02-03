import {Inject, Controller, Provide, Get, Query} from '@midwayjs/decorator';
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

  @Get('/daycount')
  async getDayCount() {
    const data=await this.chinaService.getDayCount();
    return data;
  }

  @Get('/city')
  async getCityData(){
    const data=await this.chinaService.getCityData();
    return data;
  }

  @Get('/provinceCity')
  async getCityByProvince(@Query('province') province: string){
    const data=await this.chinaService.getCityByProvince(province);
    return data;
  }
}
