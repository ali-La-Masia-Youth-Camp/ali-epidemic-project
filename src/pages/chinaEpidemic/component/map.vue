<template>
    <div id="china-map-container"></div>
</template>

<script>
import {Chart} from '@antv/g2';
import DataSet from '@antv/data-set';
import AJAX from '@/common/ajax';
import ChinaMap from '@/mock/china-province.json';

export default {
    name:'china-map',
    data(){
        return {
            data:[{
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
        ]
        }
    },

    beforeMount(){
        const ajax = new AJAX();
        const chinaMap = 'http://localhost:7001/china/province';
        ajax.get(chinaMap)
            .then((mapData) => {
                this.data = mapData.data;
        }).catch(e=>console.log(e));
    },

    mounted() {
        setTimeout(()=>{
            const chart = new Chart({
                container: 'china-map-container',
                autoFit: true,
                padding: [40, 20],
            });
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
            worldMapView.polygon().position('longitude*latitude').style({
                fill: '#fff',
                stroke: '#ccc',
                lineWidth: 1,
            });

            // 可视化用户数据
            const userDv = ds.createView()
                .source(this.data)
                .transform({
                    geoDataView: worldMap,
                    field: 'name',
                    type: 'geo.region',
                    as: ['longitude', 'latitude'],
                })
                .transform({
                    type: 'map',
                      callback: obj => {
                        return obj;
                      }
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
                .color('value', ['#eac54d', '#ff0e05'])
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

            chart.render();
        });
    }
}
</script>

<style>
#china-map-container{
    width: 100%;
    height: 100%;
}
</style>