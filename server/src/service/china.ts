import { App,Provide,Inject } from '@midwayjs/decorator';
import { Application,Context } from 'egg';


@Provide()
export class ChinaService {

  @App()
  app: Application;

  @Inject()
  ctx: Context;

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
    const result={
        isOk:true,
        data
    }

    return result;
  }

  //查询最近n天的确诊数据
  async getNDayData(){

  }

  //查询最近一个月每天的确证数量
  async getDayCount(){
    let result={
      isOk:false,
      data:[],
      error:''
    }
    const data=await this.app.curl('https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=chinaDayList',{
      method: 'GET',
      dataType: 'json',
    });
    if(data!=null){
      let count=0;
      data.data.data.chinaDayList.reverse().some(item=>{
        result.data.push({
          date:item.date+' '+item.y,
          value:item.nowConfirm
        })
        count++;
        if(count==30){
          return true;
        }
      })
    }else{
      result.error='获取疫情数据失败'
    }
    return result;
  }

  //获取近期确诊数目最多的十个城市
  async getCityData(){
    let result={
      isOk:false,
      data:[],
      error:''
    }
    const data=await this.app.curl('https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail',{
      method: 'GET',
      dataType: 'json',
    });
    if(data!=null){
      //对数据按照确诊数据排序
      let sumData=data.data.data.statisGradeCityDetail;
      if(sumData.length<=10){
        result.isOk=true;
        result.data=sumData;
      }else{
        for(let i=10;i<sumData.length;i++){
            let min=sumData[0];
            let d=0;
            for(let j=1;j<10;j++){
              if(sumData[j]<min){
                min=sumData[j];
                d=j;
              }
            }
            if(sumData[i]>min){
              sumData[d]=sumData[i];
            }
        }
        result.isOk=true;
        result.data=sumData.splice(10)
      }
    }else{
      result.error='获取疫情数据失败'
    }
    return result;
  }

}
