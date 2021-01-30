import { Component, Vue } from 'vue-property-decorator';
import { Scene, PolygonLayer, LineLayer, Popup } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import './style.scss';

@Component({})
export default class SoccerEpidemic extends Vue {
    public render() {
        return (
            <div class='fullpage-container__section'>
                <div id="soccer-container" ></div>
            </div>
        );
    }
}

const scene = new Scene({
    id: 'soccer-container',
    map: new GaodeMap({
        style: 'dark',
        center: [10.770672, 45.159869],
        zoom: 5.5,
        pitch: 0,
    }),
});