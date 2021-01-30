import { Component, Vue } from 'vue-property-decorator';
import DataSet from '@antv/data-set';
import { Chart, View, registerInteraction } from '@antv/g2';
import USAJson from '@/mock/usa.json';
import USAStateJson from '@/mock/foreign-list.json';
import { IUSAStateEpidemic } from '@/interfaces';
import { findMaxComfirmFromGeoData, findMinComfirmFromGeoData } from '@/utlis/array.utli';
import './style.scss';
import { InteractionSteps } from '@antv/g2/lib/interaction/grammar-interaction';
import { InteractionConstructor } from '@antv/g2/lib/interaction/interaction';

@Component({})
export default class UsaEpidemic extends Vue {

    public mapData!: any;

    public epidemicData!: IUSAStateEpidemic[];

    public chart!: View;

    public dataset!: any;

    public $refs!: {
        usaMap: HTMLDivElement,
    };

    public scaleState(source: any, name: string, latStep: number, longStep: number) {
        const state = source.rows.find((row: any) => row.name === name);
        const stateIndex = source.rows.findIndex((row: any) => row.name === name);
        const { longitude, latitude } = state;
        const scaleLatitude = latitude.map((coord: number) => {
            return coord + latStep;
        });
        const scaleLongitude = longitude.map((coord: number) => {
            return coord + longStep;
        });
        state.latitude = scaleLatitude;
        state.longitude = scaleLongitude;
        source.rows.splice(stateIndex, 1, state);
    }

    public setTooltip() {
        if (this.chart) {
            this.chart.tooltip({
                showTitle: false,
            });
        }
    }

    public setScale() {
        if (this.chart) {
            this.chart.scale({
                longitude: {
                  sync: true,
                },
                latitude: {
                  sync: true,
                },
              });
        }
    }

    public setAxis(axis: boolean) {
        if (this.chart) {
            this.chart.axis(axis);
        }
    }

    public setLegend(legend: boolean | string, config?: any) {
        if (this.chart) {
            if (typeof legend === 'boolean') {
                this.chart.legend(legend);
            } else {
                this.chart.legend(legend, config);
            }
        }
    }

    public registerStateClick() {
        registerInteraction('state-click', {
            showEnable: [
                { trigger: 'plot:mouseenter', action: 'cursor:pointer' },
                { trigger: 'mask:mouseenter', action: 'cursor:move' },
                { trigger: 'plot:mouseleave', action: 'cursor:default' },
                { trigger: 'mask:mouseleave', action: 'cursor:pointer' },
            ],
            start: [
                { trigger: 'plot:click', isEnable(context) {
                    console.log(context);
                    return false;
                }, action: ['scale-zoom:zoomOut'] }
            ],
            processing: [],
            end: [],
        });
    }

    /**
     * 美国地图背景
     */
    public drawDataSetBackground(maxState: IUSAStateEpidemic, minState: IUSAStateEpidemic) {
        this.dataset = new DataSet();
        const usaMap = this.dataset.createView('back')
            .source(this.mapData, {
                type: 'GeoJSON',
            });
        this.scaleState(usaMap, 'Hawaii', 8, 51);
        this.scaleState(usaMap, 'Puerto Rico', 10, -25);
        const worldMapView = this.chart.createView();
        worldMapView.data(usaMap.rows);
        worldMapView.tooltip(false);
        worldMapView.polygon().position('longitude*latitude').style({
            fill: '#fff',
            stroke: '#ccc',
            lineWidth: 1,
        });

        this.drawDataSetUserView(usaMap, {
            maxConfirm: maxState.confirm,
            minConfirm: minState.confirm,
        });
    }

    /**
     * 用户可视化数据
     */
    public drawDataSetUserView(usaMap: any, range: { maxConfirm: number, minConfirm: number }) {
        const { maxConfirm, minConfirm } = range;
        const baseColor = {
            r: 255,
            g: 0,
            b: 0,
        };
        const endColor = {
            r: 70,
            g: 0,
            b: 0,
        };
        const colorStep = {
            r: Math.abs((baseColor.r - endColor.r)) / (maxConfirm - minConfirm),
            g: Math.abs((baseColor.g - endColor.g)) / (maxConfirm - minConfirm),
            b: Math.abs((baseColor.b - endColor.b)) / (maxConfirm - minConfirm),
        };
        const userDv = this.dataset.createView()
            .source(this.epidemicData)
            .transform({
                geoDataView: usaMap,
                field: 'nameMap',
                type: 'geo.region',
                as: ['longitude', 'latitude'],
            });
        const userView = this.chart.createView();
        userView.data(userDv.rows);
        userView.scale({
            name: {
                alias: '州',
            },
            nameMap: {
                alias: 'State',
            },
            confirm: {
                alias: '确诊人数',
            },
        });
        userView.polygon()
            .position('longitude*latitude')
            .color('confirm', (confirm: number) => {
                const steps = confirm - minConfirm;
                const r = Math.floor(baseColor.r - steps * colorStep.r);
                const g = Math.floor(baseColor.g - steps * colorStep.g);
                const b = Math.floor(baseColor.b - steps * colorStep.b);
                return `rgba(${r}, ${g}, ${b})`;
            })
            .tooltip('nameMap*confirm*name')
            .style({
                fillOpacity: 0.85,
            })
            .animate({
                leave: {
                    animation: 'fade-out',
                },
            });

        userView.interaction('element-active');
        userView.interaction('state-click');
    }

    public renderChart() {
        this.chart.render();
    }

    public mounted() {
        this.mapData = USAJson;
        this.epidemicData = USAStateJson.data.children;

        this.chart = new Chart({
            container: 'usa-map__container',
            autoFit: true,
            height: 450,
            width: window.innerWidth / 2,
            padding: [20, 18],
        });

        const maxConfirmState = findMaxComfirmFromGeoData(this.epidemicData);
        const minConfirmState = findMinComfirmFromGeoData(this.epidemicData);

        this.registerStateClick();

        this.setTooltip();

        this.setScale();

        this.setLegend(false);

        this.setAxis(false);

        this.drawDataSetBackground(maxConfirmState, minConfirmState);

        this.renderChart();
    }

    public render() {
        return (
            <div class='fullpage-container__section usa-epidemic'>
                <div
                    id='usa-map__container'
                    ref='usaMap'
                ></div>
            </div>
        );
    }
}
