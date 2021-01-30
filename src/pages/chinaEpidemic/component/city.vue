<template>
    <div id="main-city-container"></div>
</template>

<script>
import {Chart} from '@antv/g2';

export default {
    name:'city',
    data(){
        return {
            city:[
  { city: '北京', value: 34 },
  { city: '天津', value: 85 },
  { city: '上海', value: 103 },
  { city: '杭州', value: 142 },
  { city: '苏州', value: 251 },
  { city: '广州', value: 367 },
  { city: '郑州', value: 491 },
  { city: '福州', value: 672 },
  { city: '济南', value: 868 },
  { city: '西安', value: 1200 },
]
        };
    },
    mounted(){
        const chart = new Chart({
            container:'main-city-container',
            autoFit:true,
            padding:[10,80]
        })


        chart.interval()
            .position('city*value')
            .color('value',['yellow','green'])
            .label('city',{
                style:{
                    fill:'grey'
                },
                offset:10
            });
        chart.legend(false);    
        chart.coordinate().transpose();
        chart.scale({
            value:{
                alias:'近日确诊数量'
            }
        })
        chart.data(this.city);
        chart.interaction('element-active');
        chart.render();
    }
}
</script>

<style scoped>
#main-city-container{
    width: 100%;
    height: 100%;
}
</style>