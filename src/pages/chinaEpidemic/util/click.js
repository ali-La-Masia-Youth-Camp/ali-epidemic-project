import {Chart} from '@antv/g2';


let curview = null;

//地图点击显示提示信息
//参数 组件对象
export default function(view,component){
    view.on('element:click', (context) => {
        setTimeout(()=>{
            component.$refs.hint.style.top = `${component.y}px`;
            component.$refs.hint.style.left = `${component.x}px`;
            component.$refs.hint.style.display = 'block';
            !curview && (curview = draw());
        });
    });
    //! 应该节流一下的
    view.on('plot:mousemove', (context)=>{
        // curview&&deleteview();
        component.$refs.hint.style.display = 'none';
    });
}

function draw(){
    const chart = new Chart({
        container: 'province-hint',
        autoFit: true,
        padding: [50,30],
    });
    const view = chart.createView();

    const data = [
        { type: '青岛', value: 1 },
        { type: '烟台', value: 4 },
        { type: '威海', value: 3 },
        { type: '菏泽', value: 3 },
        { type: '济宁', value: 8 },
        { type: '临沂', value: 2 },
        { type: '济南', value: 3 },
        { type: '枣庄', value: 9 },
      ];
      
      view.data(data);
      view.scale('value', {
        alias: '人数',
      });
      
      view.axis('type', {
        tickLine: {
          alignTick: false,
        },
      });
      view.axis('value', false);
      
      view.tooltip({
        showMarkers: false,
      });
      view.interval().position('type*value');
      view.interaction('element-active');
      
      // 添加文本标注
      data.forEach((item) => {
        view
          .annotation()
          .text({
            position: [item.type, item.value],
            content: item.value,
            style: {
              textAlign: 'center',
            },
            offsetY: -30,
          })
      });
      chart.render();
      return view;
}

function deleteview(){
    // console.log(view);
    curview.clear();
    curview = null;
}