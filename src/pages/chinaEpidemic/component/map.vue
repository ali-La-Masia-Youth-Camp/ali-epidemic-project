<template>
    <div class="map-container">
        <div class="map-title">一月疫情地图</div>
        <div id="china-map-container" ref="container"></div>
        <div id="province-hint" ref="hint"></div>
    </div>
</template>

<script>
import {Chart} from '@antv/g2';
import DataSet from '@antv/data-set';
import AJAX from '@/common/ajax';
import ChinaMap from '@/mock/china-province.json';
import {Message} from 'element-ui';
import showHint from '../util/click';

export default {
    name: 'china-map',
    data() {
        return {
            data: [
                {
                    name: '黑龙江',
                    value: 86.8,
                },
                {
                    name: '山东',
                    value: 106.3,
                },
                {
                    name: '新疆',
                    value: 94.7,
                },
                {
                    name: '海南',
                    value: 98,
                },
                {
                    name: '四川',
                    value: 98.4,
                },
                {
                    name: '甘肃',
                    value: 97.2,
                },
            ],
            x: 0,
            y: 0,
        };
    },

    mounted() {
        this.$refs.container.addEventListener('click', (e) => {
            this.x = e.x;
            this.y = e.y;
        });

        const ajax = new AJAX();
        const provinceURL = 'http://localhost:7001/china/province';
        ajax.get(provinceURL)
            .then((rep) => {
                const pData = rep.data;
                if (pData.isOk) {
                    this.$has = pData.data.filter((item) => item.value !== 0);
                    // this.data.no = pData.data.filter((item) => item.value === 0);
                    // this.data = pData.data;                    
                    this.render();
                } else {
                    console.error('map');
                    Message.error(pData.error);
                }
            })
            .catch((e) => {
                console.error('map');
                Message.error(e);
            }); 
    },
    methods: {
        render(){
            setTimeout(() => {
                const chart = new Chart({
                    container: 'china-map-container',
                    autoFit: true,
                    padding: [40, 20],
                });
                showHint(chart,this);

                chart.tooltip({
                    showTitle: false,
                    showMarkers: false,
                    shared: true,
                });
                // 同步度量
                chart.scale({
                    longitude: {
                        sync: true,
                    },
                    latitude: {
                        sync: true,
                    },
                });
                chart.axis(false);
                chart.legend('trend', {
                    position: 'left',
                });
                // 绘制世界地图背景
                const ds = new DataSet();
                const worldMap = ds.createView('back')
                    .source(ChinaMap, {
                        type: 'GeoJSON',
                    });
                const worldMapView = chart.createView();
                worldMapView.data(worldMap.rows);
                worldMapView.tooltip(false);
                worldMapView.polygon()
                            .position('longitude*latitude')
                            .style({
                                fill: '#fff',
                                stroke: '#ccc',
                                lineWidth: 1,
                            });
                // 可视化用户数据
                this.userData(this.$has, ['#FF0000', '#220000'], ds, chart, worldMap);
                // this.userData(this.data.no, ['white'], ds, chart, worldMap);
                chart.render();
            });
        },

        userData(data,color,ds,chart,worldMap){
            const userDv = ds.createView()
                                .source(data)
                                .transform({
                                    geoDataView: worldMap,
                                    field: 'name',
                                    type: 'geo.region',
                                    as: ['longitude', 'latitude'],
                                })
                                .transform({
                                    type: 'map',
                                    callback: (obj) => {
                                        return obj;
                                    },
                                });
                const userView = chart.createView();
                userView.data(userDv.rows);
                userView.scale({
                    value: {
                        alias: '数量',
                    },
                    name: {
                        alias: '省份',
                    },
                });
                userView.polygon()
                    .position('longitude*latitude')
                    .color('value', color)
                    .tooltip('name*value')
                    .style({
                        fillOpacity: 0.85,
                    })
                    .animate({
                        leave: {
                            animation: 'fade-out',
                        },
                    });
                userView.interaction('element-active');
        }
    },
};
</script>

<style>
.map-container{
    width: 100%;
    height: 100%;
}
#china-map-container{
    width: 100%;
    height: 90%;
}
.map-title{
    width: 100%;
    height: 40px;
    margin: 0;
    color: orange;
    line-height: 40px;
    font-size: 20px;
    text-align: center;
}
#province-hint{
    width: 30%;
    height: 30%;
    background: white;
    position: absolute;
    display: none;
    z-index: 999;
    border-radius: 5px;
}
</style>