import { App,Provide,Inject } from '@midwayjs/decorator';
import { Application,Context } from 'egg';
import {Request} from "../util/request";


@Provide()
export class ChinaService {

  @App()
  app: Application;

  @Inject()
  ctx: Context;
  @Inject()
  request:Request;

  // static provinceNames=['黑龙江']


  static provinceNames=['黑龙江','辽宁','吉林','北京','天津',
    '河北','山东','江苏','上海','浙江','福建',
    '广东','香港','澳门','台湾','广西',
    '云南','西藏','新疆','内蒙古','山西',
    '陕西','甘肃','青海','四川','重庆',
    '贵州','湖南','湖北','江西','河南','安徽',
    '宁夏','海南']


  //查询每个省近一个月的新增病例
  async getProvince() {
    let result={
      isOk:false,
      data:[],
      error:''
    }
    try{
      const staticUrl='https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list?province=';
      let data=[];
      await Promise.all(ChinaService.provinceNames.map( async province=>{
          let url=staticUrl+province;
          let provinceData= await this.app.curl(url,{
            method: 'GET',
            dataType: 'json',
          })
          let count=0;
          let monthSum=0;
          if(provinceData.data.data!=null){
            provinceData.data.data.reverse().some(item=>{
              monthSum+=Number(item.confirm_add)
              count++;
              if(count==30){
                return true;
              }
            })
            data.push({
              name:province,
              value:monthSum
            })
          }
        })
      )
      result.isOk=true;
      result.data=data;
      return result;
    }catch(error){
      result.error='数据获取失败';
      return result;
    }
  }

  async getDayCount(){
      let result=await this.request.getData('https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=chinaDayAddList')
      let data=result.data;
      if(result.isOk){
        //获取数据成功了
        let count=0;
        result.data=[];
        data.chinaDayAddList.reverse().some(item=>{
          result.data.push({
            date:item.date+' '+item.y,
            value:item.confirm
          })
          count++;
          if(count==30){
            return true;
          }
        })
      }
      return result;
  }


  async getCityData(){
      const result=await this.request.getData('https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail');
      let data=result.data;
      if(result.isOk){
        //对数据按照确诊数据排序
        let sumData=data.statisGradeCityDetail;
        if(sumData.length<=10){
          result.data=sumData;
        }else{
          for(let i=10;i<sumData.length;i++){
            let min=sumData[0].confirmAdd;
            let d=0;
            for(let j=1;j<10;j++){
              if(sumData[j].confirmAdd<min){
                min=sumData[j].confirmAdd;
                d=j;
              }
            }
            if(sumData[i].confirmAdd>min){
              sumData[d]=sumData[i];
              sumData[d].count=sumData[d].confirmAdd;
            }
          }
          result.data=sumData.splice(0,10);
          console.log(result.data);
        }
      }
      return result;
  }
}
