<template>
    <div id="trend-container"></div>
</template>

<script>
import {Chart} from '@antv/g2';

export default {
    name:'trend',
    data(){
        return {
            data:[
                { date: '2020-1-12', value: 34 },
                { date: '2020-1-13', value: 85 },
                { date: '2020-1-14', value: 103 },
                { date: '2020-1-15', value: 142 },
                { date: '2020-1-16', value: 251 },
                { date: '2020-1-17', value: 367 },
                { date: '2020-1-18', value: 491 },
                { date: '2020-1-19', value: 672 },
                { date: '2020-1-20', value: 868 },
                { date: '2020-1-21', value: 1500 }
            ]
        };
    },
    beforeMount(){
        const ajax = new AJAX();
        const trendURL = 'http://localhost:7001/china/city';
        ajax.get(trendURL)
            .then((tData) => {
                this.data = tData.data;
            })
            .catch(e=>console.log(e));
    },
    mounted(){
        setTimeout(()=>{
            const chart = new Chart({
                container:'trend-container',
                autoFit:true,
                padding:[30,30]
            });
            chart.line()
                .position('date*value')
                .color('value',['yellow','green']);
            chart.point().position('date*value');
            chart.legend(false);    
            chart.tooltip({
                showCrosshairs: true, // 展示 Tooltip 辅助线
                shared: true,
            });
            // chart.coordinate().transpose();
            chart.scale({
                value:{
                    alias:'当日确诊数量'
                }
            });
            chart.data(this.data);
            chart.interaction('element-active');
            chart.render();
            });  
    }
}
</script>

<style scoped>
#trend-container{
    width: 100%;
    height: 100%;
}
</style>