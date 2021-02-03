<template>
    <div id="trend-container"></div>
</template>

<script>
import {Chart} from '@antv/g2';
import AJAX from '@/common/ajax';
import {Message} from 'element-ui';


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
    mounted(){
        const ajax = new AJAX();
        const trendURL = 'http://localhost:7001/china/daycount';
        ajax.get(trendURL)
            .then((req) => {
                 const tData= req.data;
                if(tData.isOk){
                    this.data = tData.data.sort((a,b)=>a>=b);
                    this.render();
                }else{
                    Message.error(tData.error);
                }
            })
            .catch((e) => {
                console.error('trend');
                Message.error(e);
            });
    },
    methods:{
            render(){
                setTimeout(()=>{
                    const chart = new Chart({
                        container:'trend-container',
                        autoFit:true,
                        padding:[0,0,25,35]
                    });
                    chart.line()
                        .position('date*value')
                        .color('value',['yellow','green']);
                    // chart.point().position('date*value');
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
            },
    },
};
</script>

<style scoped>
#trend-container{
    width: 100%;
    height: 100%;
}
</style>