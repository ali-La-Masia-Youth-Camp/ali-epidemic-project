import {Chart} from '@antv/g2';
import AJAX from '@/common/ajax';

let chart = null;
let curview = null;

//地图点击显示提示信息
//参数 组件对象
export default function(view,component){
    // console.log(view);
    view.on('element:click', (context) => {
      if(!context.data.data.value) return;
        setTimeout(()=>{
            component.$refs.hint.style.top = `${component.y}px`;
            component.$refs.hint.style.left = `${component.x}px`;
            component.$refs.hint.style.display = 'block';
            !curview && draw(context.data.data.name);
        });
    });
    //! 应该节流一下的
    view.on('plot:mousemove', (context)=>{
        curview&&deleteview();
        component.$refs.hint.style.display = 'none';
    });
}

function draw(province){
    !chart && (chart = new Chart({
        container: 'province-hint',
        autoFit: true,
        padding: [50,30],
    }));
    const view = chart.createView();

    const data = getData(province);
      
    // const data = [
    //   { city: '青岛', value: 1 },
    //   { city: '烟台', value: 4 },
    //   { city: '威海', value: 3 },
    //   { city: '菏泽', value: 3 },
    //   { city: '济宁', value: 8 },
    //   { city: '临沂', value: 2 },
    //   { city: '济南', value: 3 },
    //   { city: '枣庄', value: 9 },
    // ];

      view.data(data);
      view.scale('value', {
        alias: '人数',
      });
      
      view.axis('city', {
        tickLine: {
          alignTick: false,
        },
      });
      view.axis('value', false);
      
      view.tooltip({
        showMarkers: false,
      });
      view.interval().position('city*value');
      view.interaction('element-active');
      
      // 添加文本标注
      data.forEach((item) => {
         view
          .annotation()
          .text({
            position: [item.city, item.value],
            content: item.value,
            style: {
              textAlign: 'center',
            },
            offsetY: -30,
          });
      });
      chart.render();
      curview = view;
}

function deleteview(){
    curview.clear();
    curview = null;
}

function getData(province){
  let data = [];
  console.log(province);
  // try{
  //   const res = await Ajax('http://localhost:7001/china/provinceCity?province='+province);
  //   if(res.isOk){
  //     data = res.data;
  //     console.log(data);
  //   } 
  // }catch(e){
    
  // }
  
  // if(data.length===0)
    switch(province){
      case '山东':
        data = [
          { city: '威海', value: 1 },
          { city: '临沂', value: 1 },
          { city: '济南', value: 1 },
        ];
        break;
        case '北京':
          data = [{"city":"大兴","value":30},{"city":"顺义","value":34},{"city":"怀柔","value":1},{"city":"朝阳","value":3}];
          break;
          case '上海':
            data = [{"city":"黄浦","value":14},{"city":"宝山","value":3},{"city":"长宁","value":1}];
            break;
            case '吉林':
              data = [{"city":"通化","value":233},{"city":"长春","value":101},{"city":"松原","value":4}];
              break;
              case '河北':
                data = [{"city":"石家庄","value":895},{"city":"邢台","value":26},{"city":"保定","value":1},{"city":"廊坊","value":1}];
                break;
                case '山西':
                  data = [{"city":"晋中","value":14}];
                  break;
                  case '广西':
                    data = [{"city":"南宁","value":1}];
                    break;
                    case '黑龙江':
                    data = [{"city":"哈尔滨","value":143},{"city":"绥化","value":415},{"city":"大庆","value":2},{"city":"齐齐哈尔","value":1}];
                      break;

            
      default:
        data = [
          { city: '威海', value: 1 },
          { city: '临沂', value: 1 },
          { city: '济南', value: 1 },
        ];
    // }  
    }
    return data;
}