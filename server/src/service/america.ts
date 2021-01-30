import { App,Provide,Inject } from '@midwayjs/decorator';
import { Application,Context } from 'egg';


@Provide()
export class AmericaService {

  @App()
  app: Application;

  @Inject()
  ctx: Context;



  async getDataByDate(year:String,date:String){
    let result={
      isOk:false,
      data:{},
      error:''
    };
      const data=await this.app.curl('https://api.inews.qq.com/newsqa/v1/automation/foreign/daily/list?country=%E7%BE%8E%E5%9B%BD&',
        {
          method: 'GET',
          dataType: 'json',
        })
      if(data!=null){
        let flag=false;
        data.data.data.reverse().some(item=>{
          if(item.y===year&&item.date===date){
            flag=true;
            result.data=item;
            result.isOk=true;
            return true;
          }
        })
        if(flag==false){
          result.error='当日数据获取失败'
        }
      }
    return result;
  }


}
