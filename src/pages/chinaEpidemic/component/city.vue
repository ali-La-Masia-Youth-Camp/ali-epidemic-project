<template>
    <div id="main-city-container"></div>
</template>

<script>
import {Chart} from '@antv/g2';
import AJAX from '@/common/ajax';
import {Message} from 'element-ui';

export default {
    name: 'city',
    data() {
        return {
            city: [
                { city: '北京', confirm: 34 },
                { city: '天津', confirm: 85 },
                { city: '上海', confirm: 103 },
                { city: '杭州', confirm: 142 },
                { city: '苏州', confirm: 251 },
                { city: '广州', confirm: 367 },
                { city: '郑州', confirm: 491 },
                { city: '福州', confirm: 672 },
                { city: '济南', confirm: 868 },
                { city: '西安', confirm: 1200 },
            ],
        };
    },
    mounted() {
            const ajax = new AJAX();
            const cityURL = 'http://localhost:7001/china/city';
            ajax.get(cityURL)
                .then((req) => {
                    const cityData = req.data;
                    if (cityData.isOk) {
                        this.city = cityData.data.sort((a, b) => b.confirm - a.confirm);
                        this.render();
                        // console.log(this.city);
                    } else {
                        Message.error(cityData.error);
                    }
                })
                .catch((e) => {
                    console.error(e,'city');
                    Message.error(e);
                });
    },
    methods: {
         render() {
            setTimeout(() => {
                const chart = new Chart({
                    container: 'main-city-container',
                    autoFit: true,
                    padding: [20, 80],
                });
                chart.interval()
                    .position('city*confirm')
                    .color('confirm', ['yellow', 'green'])
                    .label('city', {
                        style: {
                            fill: 'white',
                        },
                        offset: 20,
                    });
                chart.legend(false);
                chart.coordinate().transpose();
                chart.scale({
                    confirm: {
                        alias: '近日确诊数量',
                    },
                });
                chart.data(this.city);
                chart.interaction('element-active');
                chart.render();
            });
        },
    },
};
</script>

<style>
#main-city-container{
    width: 100%;
    height: 100%;
}
</style>