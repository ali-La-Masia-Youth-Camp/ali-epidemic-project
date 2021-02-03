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
    try{
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
    }catch(error){
      result.error='数据获取失败';
      return result;
    }
  }

  async getDataByState(state:string){
    let result={
      isOk:false,
      data:{},
      error:''
    };
    try{
      const data=await this.app.curl('https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=FAutoforeignList',
        {
          method: 'GET',
          dataType: 'json',
        })
      if(data!=null){
        let americaData=data.data.data.FAutoforeignList[0]
        if(state==null||state==undefined||state.trim()==''){
          //返回全美国的数据
          result.isOk=true;
          result.data={
            confirm:americaData.confirm,
            heal:americaData.heal,
            dead:americaData.dead
          }
        }else{
          let flag=false;
          americaData.children.some(item=>{
            if(item.name===state){
              result.data=item;
              result.isOk=true;
              flag=true;
              return true;
            }
          })
          if(flag==false){
            result.error='获取'+state+'州疫情数据失败'
          }
        }

      }
      return result;
    }catch (error){
      result.error='数据获取失败';
      return result;
    }
  }
}
