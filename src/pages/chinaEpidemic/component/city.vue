<template>
    <div id="main-city-container"></div>
</template>

<script>
import {Chart} from '@antv/g2';
import {AJAX} from '@/common/ajax';

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
    beforeMount(){
            const ajax = new AJAX();
            const cityURL = 'http://localhost:7001/china/city';
            ajax.get(cityURL)
                .then((cityData) => {
                    this.city = cityData.data;
                })
                .catch(e=>console.log(e));
    },
    mounted(){
        setTimeout(()=>{
            const chart = new Chart({
            container:'main-city-container',
            autoFit:true,
            padding:[20,80]
        });
        chart.interval()
            .position('city*value')
            .color('value',['yellow','green'])
            .label('city',{
                style:{
                    fill:'white'
                },
                offset:20
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
        });
    }
}
</script>

<style>
#main-city-container{
    width: 100%;
    height: 100%;
}
</style>