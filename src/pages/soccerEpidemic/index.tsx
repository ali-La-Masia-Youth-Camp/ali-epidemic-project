/*
 * @Author: your name
 * @Date: 2021-01-29 18:13:19
 * @LastEditTime: 2021-01-31 15:09:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ali-epidemic-project\src\pages\soccerEpidemic\index.tsx
 */
import { Component, Vue } from 'vue-property-decorator';
import { Scene, Marker } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import './style.scss';

@Component({})
export default class SoccerEpidemic extends Vue {

    mounted() {
        const scene = new Scene({
            id: 'soccer-container',
            map: new GaodeMap({
                style: 'dark',
                center: [10.770672, 45.159869],
                zoom: 5.5,
                maxZoom: 5.5,
                minZoom: 5.5,
                pitch: 0,
                token: 'ed39cda10e7496acd354632b9945313f'
            }),
        });
        scene.on('loaded', () => {
            // 添加法甲logo
            const el = document.createElement('img');
            el.className = 'fj';
            el.src = 'fj.png';
            el.width = 75;
            el.height = 44;
            const marker = new Marker({ element: el }).setLnglat({ lng: 2.201204, lat: 48.513902 });
            scene.addMarker(marker);

            // 添加意甲logo
            const el1 = document.createElement('img');
            el1.className = 'yj';
            el1.src = 'yj.png';
            el1.width = 60;
            el1.height = 65;
            const marker1 = new Marker({ element: el1 }).setLnglat({ lng: 12.501204, lat: 41.813902 });
            scene.addMarker(marker1);

            // 添加西甲logo
            const el2 = document.createElement('img');
            el2.className = 'xj';
            el2.src = 'xj.png';
            el2.width = 75;
            el2.height = 44;
            const marker2 = new Marker({ element: el2 }).setLnglat({ lng: -3.421204, lat: 40.253902 });
            scene.addMarker(marker2);

            // 添加德甲logo
            const el3 = document.createElement('img');
            el3.className = 'dj';
            el3.src = 'dj.png';
            el3.width = 75;
            el3.height = 44;
            const marker3 = new Marker({ element: el3 }).setLnglat({ lng: 12.251204, lat: 52.303902 });
            scene.addMarker(marker3);

            // 添加英超logo
            const el4 = document.createElement('img');
            el4.className = 'yc';
            el4.src = 'yc.png';
            el4.width = 75;
            el4.height = 44;
            const marker4 = new Marker({ element: el4 }).setLnglat({ lng: 0.151204, lat: 51.303902 });
            scene.addMarker(marker4);

            // 添加欧足联标志
            const el5 = document.createElement('img');
            el5.className = 'uefa';
            el5.src = 'uefa.png';
            el5.width = 120;
            el5.height = 120;
            const marker5 = new Marker({ element: el5 }).setLnglat({ lng: -15.5852328, lat: 34.864434 });
            scene.addMarker(marker5);


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


