import { App,Provide,Inject } from '@midwayjs/decorator';
import { Application,Context } from 'egg';
import {readFileSync} from 'fs';



@Provide()
export class FootballService {

  @App()
  app: Application;

  @Inject()
  ctx: Context;

  // @Inject()
  // readFile: ReadFileSync;

  async getFootballList() {
    try{
      const data=readFileSync(this.app.baseDir+'\\data\\footballList.json');
      let res=data.toString();
      const list=(JSON).parse(res);
      return {
        "isOk": false,
        "errMsg": "",
        "data":list
      }
    }catch (error){
      return {
        "isOk": false,
        "errMsg": "数据获取失败",
        "data":[]
      }
    }

  }



}
