/*
 * @Author: your name
 * @Date: 2021-01-29 18:13:19
 * @LastEditTime: 2021-02-03 19:10:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ali-epidemic-project\src\pages\soccerEpidemic\index.tsx
 */
import { Component, Vue } from 'vue-property-decorator';
import { Scene, Marker, PointLayer, Popup, Scale, Zoom, Layers } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import leagueList from './mock/leagueList.json';
import Table from './component/table.vue';
import Trend from './component/trend.vue';
import './style.scss';
import { Button } from 'element-ui';

@Component({
    components: {
        Table,
        Trend
    }
})
export default class SoccerEpidemic extends Vue {

    public leagueListData!: any;
    public leagueListData_ca!: any;
    public leagueListData_ch!: any;


    public mounted() {




        const scene = new Scene({
            id: 'soccer-container',
            map: new GaodeMap({
                style: 'dark',
                center: [10.770672, 46.159869],
                zoom: 5.5,
                minZoom: 5.5,
                rotation: -0.76,
                pitch: 48.62562,
                token: 'ed39cda10e7496acd354632b9945313f',
            }),
        });
        scene.on('loaded', () => {
            this.leagueListData = leagueList.data;
            //每日新增柱状图的经纬度信息
            this.leagueListData_ca = this.leagueListData.map((item: any) => ({
                ...item,
                league_lng: parseFloat(item.league_lng) + 0.5 + ''
            }));
            //每日新增柱状图的经纬度信息
            this.leagueListData_ch = this.leagueListData_ca.map((item: any) => ({
                ...item,
                league_lng: parseFloat(item.league_lng) + 0.5 + ''
            }));

            // 添加欧足联标志
            const el5 = document.createElement('img');
            el5.className = 'uefa';
            el5.src = 'uefa.png';
            el5.width = 120;
            el5.height = 120;
            el5.title = '欧足联'
            el5.onclick = function () {
                window.open('https://soccer.hupu.com/uefa/');
            };
            const marker5 = new Marker({ element: el5 }).setLnglat({ lng: -7.5852328, lat: 36.864434 });
            scene.addMarker(marker5);

            this.leagueListData.map((item: any) => {
                const el = document.createElement('img');
                el.className = item.league_Name;
                el.src = item.league_Name + '.png';
                el.width = 80;
                el.height = 75;
                if (item.league_Name === 'yj') {
                    el.width = 70;
                    el.height = 85;
                }
                let href='',title = '';
                switch (item.league_Name) {
                    case 'xj':
                        href = 'spain';
                        title='西甲'
                        break;
                    case 'yj':
                        href = 'italy';
                        title='意甲'
                        break;
                    case 'dj':
                        href = 'germany';
                        title='德甲'
                        break;
                    case 'yc':
                        href = 'england';
                        title='英超'
                        break;
                    default:
                        href = 'uefa';
                        title='法甲'
                }
                el.title = title;
                el.onclick = function () {
                    window.open('https://soccer.hupu.com/' + href);
                };
                const marker = new Marker({ element: el }).setLnglat({ lng: parseFloat(item.league_lng) - 2.0, lat: item.league_lat });
                scene.addMarker(marker);
            });

            // 添加累计确诊的3d柱状图层
            const pointLayer = new PointLayer({ zIndex: 999 }).source(this.leagueListData, {
                parser: {
                    type: 'json',
                    x: 'league_lng',
                    y: 'league_lat',
                },
            }).shape('cylinder')
                .size('confirm_all', function (level) {
                    return [6, 6, level * 2 + 20];
                })
                .active(true)
                .color('blue')
                .style({
                    opacity: 1.5,
                    strokeWidth: 50,
                });

            pointLayer.on('mousemove', (e) => {
                const popup = new Popup({
                    offsets: [0, 0],
                    closeButton: false,
                })
                    .setLnglat({ lng: e.feature.league_lng, lat: e.feature.league_lat })
                    .setHTML(`<span>累计确诊: ${e.feature.confirm_all}</span>`);
                scene.addPopup(popup);
            });
            scene.addLayer(pointLayer);

            // 添加每日新增的3d柱状图层
            const pointLayer1 = new PointLayer({ zIndex: 999 }).source(this.leagueListData_ca, {
                parser: {
                    type: 'json',
                    x: 'league_lng',
                    y: 'league_lat',
                },
            }).shape('hexagonColumn')
                .size('confirm_add', function (level) {
                    return [6, 6, level * 10];
                })
                .active(true)
                .color('red')
                .style({
                    opacity: 1.0,
                    strokeWidth: 50,
                    offsets: [100, 100]
                });

            pointLayer1.on('mousemove', (e) => {
                const popup = new Popup({
                    offsets: [10, 10],
                    closeButton: false,
                })
                    .setLnglat({ lng: e.feature.league_lng, lat: e.feature.league_lat })
                    .setHTML(`<span>今日确诊: ${e.feature.confirm_add}</span>`);
                scene.addPopup(popup);
            });
            scene.addLayer(pointLayer1);

            // 添加每日治愈的3d柱状图层
            const pointLayer2 = new PointLayer({ zIndex: 999 }).source(this.leagueListData_ch, {
                parser: {
                    type: 'json',
                    x: 'league_lng',
                    y: 'league_lat',
                },
            }).shape('squareColumn')
                .size('confirm_heal', function (level) {
                    return [6, 6, level * 10];
                })
                .active(true)
                .color('green')
                .style({
                    opacity: 1.0,
                    strokeWidth: 50,
                    offsets: [100, 300]
                });

            pointLayer2.on('mousemove', (e) => {
                const popup = new Popup({
                    offsets: [10, 10],
                    closeButton: false,
                })
                    .setLnglat({ lng: e.feature.league_lng, lat: e.feature.league_lat })
                    .setHTML(`<span>今日治愈: ${e.feature.confirm_heal}</span>`);
                scene.addPopup(popup);
            });
            scene.addLayer(pointLayer2);

            // 添加放大缩小
            const zoomControl = new Zoom({
                position: 'bottomright',
            });
            // 添加比例尺
            const scaleControl = new Scale({
                position: 'bottomright',
            });

            scene.addControl(scaleControl);
            scene.addControl(zoomControl);
            scene.render();
        });

    }

    public render() {

        return (
            <div class='fullpage-container__section'>
                <div id="soccer-container" ></div>
                <div class="display-table">
                    <Table></Table>
                    <Trend></Trend>
                </div>
            </div>
        );
    }
}


