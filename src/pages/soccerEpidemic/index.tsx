/*
 * @Author: your name
 * @Date: 2021-01-29 18:13:19
 * @LastEditTime: 2021-01-31 17:29:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ali-epidemic-project\src\pages\soccerEpidemic\index.tsx
 */
import { Component, Vue } from 'vue-property-decorator';
import { Scene, Marker, PointLayer, Popup } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import leagueList from './mock/leagueList.json'
import './style.scss';

@Component({})
export default class SoccerEpidemic extends Vue {

    public leagueListData!: any;

    mounted() {
        const scene = new Scene({
            id: 'soccer-container',
            map: new GaodeMap({
                style: 'dark',
                center: [10.770672, 46.159869],
                zoom: 5.5,
                minZoom: 5.5,
                rotation: -0.76,
                pitch: 48.62562,
                token: 'ed39cda10e7496acd354632b9945313f'
            }),
        });
        scene.on('loaded', () => {
            this.leagueListData = leagueList.data;

            // 添加欧足联标志
            const el5 = document.createElement('img');
            el5.className = 'uefa';
            el5.src = 'uefa.png';
            el5.width = 120;
            el5.height = 120;
            const marker5 = new Marker({ element: el5 }).setLnglat({ lng: -7.5852328, lat: 36.864434 });
            scene.addMarker(marker5);

            this.leagueListData.map((item: any) => {
                let el = document.createElement('img');
                el.className = item.league_Name;
                el.src = item.league_Name + '.png';
                el.width = 75;
                el.height = 44;
                if (item.league_Name === 'yj') {
                    el.width = 60;
                    el.height = 65;
                }
                let marker = new Marker({ element: el }).setLnglat({ lng: item.league_lng, lat: item.league_lat });
                scene.addMarker(marker);
            })

            const pointLayer = new PointLayer({}).source(this.leagueListData, {
                parser: {
                    type: 'json',
                    x: 'league_lng',
                    y: 'league_lat'
                }
            }).shape('cylinder')
                .size('confirm_all', function (level) {
                    return [6, 6, level * 2 + 20];
                })
                .active(true)
                .color('#E83132')
                .style({
                    opacity: 1.5,
                    strokeWidth: 50
                });

            pointLayer.on('mousemove', e => {
                const popup = new Popup({
                    offsets: [0, 10],
                    closeButton: false
                })
                    .setLnglat({ lng: e.feature.league_lng, lat: e.feature.league_lat })
                    .setHTML(`<span>累计确诊: ${e.feature.confirm_all}</span>`);
                scene.addPopup(popup);
            });
            scene.addLayer(pointLayer);


            const pointLayer1 = new PointLayer({}).source(this.leagueListData, {
                parser: {
                    type: 'json',
                    x: 'league_lng',
                    y: 'league_lat'
                }
            }).shape('hexagonColumn')
                .size('confirm_add', function (level) {
                    return [6, 6, level * 5 + 20];
                })
                .active(true)
                .color('#E83132')
                .style({
                    strokeWidth: 50,
                    offsets: [500, 500]
                });

            pointLayer1.on('mousemove', e => {
                const popup = new Popup({
                    offsets: [0, 0],
                    closeButton: false
                })
                    .setLnglat({ lng: e.feature.league_lng, lat: e.feature.league_lat })
                    .setHTML(`<span>新增确诊: ${e.feature.confirm_add}</span>`);
                scene.addPopup(popup);
            });
            scene.addLayer(pointLayer1);
            scene.render();
        });

    }

    public render() {

        return (
            <div class='fullpage-container__section'>
                <div id="soccer-container" ></div>
            </div>
        );
    }
}


