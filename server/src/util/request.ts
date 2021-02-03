import { App,Provide,Inject } from '@midwayjs/decorator';
import { Application ,Context} from 'egg';


@Provide()
export class Request{

  @App()
   app: Application;
  @Inject()
   ctx:Context;

   async getData(url:string){
    let result={
      isOk:false,
      data:null,
      error:''
    };
    try{
      const data=await this.app.curl(url,  {
        method: 'GET',
        dataType: 'json',
      })
      result.data=data.data.data;
      this.ctx.logger.info(data.data.data);
      if(result.data!=null){
        result.isOk=true;
      }else{
        result.error='获取数据为空'
      }
      return result;
    }catch(error){
      result.error='获取数据失败，请检查网络连接';
      return result;
    }

  }


}
