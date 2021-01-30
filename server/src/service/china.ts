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
}
