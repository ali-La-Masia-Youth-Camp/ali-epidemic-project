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
    public mapData!: any; //原始地图数据

    public mapDataView!: any;

    public epidemicData!: IUSAStateEpidemic[];

    public chart!: View;

    public view!: View;

    public backgroundView!: View;
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

    public initOptions() {
        this.setTooltip();
        this.setScale();
        this.setLegend(false);
        this.setAxis(false);
    }

    public handleChartActions() {
        this.registerStateClick();

        this.listenChartClick();
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
        });
    }

    getClickStateData(cb: any) {
        this.chart.on('element:click', (ev: any) => {
            const stateData = ev.data.data;
            if(stateData) {
                cb(stateData);
            }
        })
    }

    getStateCoordinates(name: string) {
        return {
            type: 'FeatureCollection',
            features: [ this.mapData.features.find((state: any) => state.properties.name === name) ]
        };
    }

    listenChartClick() {
        this.getClickStateData((stateData: IUSAStateEpidemic) => {
            this.backgroundView.clear();
            this.view.clear();
            const region = {
                region: {
                    start: { x: 0.2, y: 0.1 },
                    end: { x: 0.6, y: 0.9 },
                }
            };
            const stateCoords = this.getStateCoordinates(stateData.nameMap);
            const stateMapView = this.dataset.createView(stateData.nameMap)
                .source(stateCoords, {
                    type: 'GeoJSON',
                });
            const stateBgView = this.chart.createView(region)
            const stateUserView = this.chart.createView(region)
            this.draw(stateMapView, [stateData], stateBgView, stateUserView);
            this.renderChart();
        })
    }

    public draw(
        coordData: any, 
        epidemicData: IUSAStateEpidemic[],
        bgView = this.backgroundView,
        userView = this.view
    ) {
        const maxConfirmState = findMaxComfirmFromGeoData(this.epidemicData);
        const minConfirmState = findMinComfirmFromGeoData(this.epidemicData);

        this.drawDataSetBackground(coordData, bgView);

        this.drawDataSetUserView(epidemicData, {
            maxConfirm: maxConfirmState.confirm,
            minConfirm: minConfirmState.confirm,
        }, userView);
    }

    /**
     * 美国地图背景
     */
    public drawDataSetBackground(sourceData: any, bgView: View) {
        console.log('sourceData: ', sourceData);
        if(sourceData.rows.length > 1) {
            this.scaleState(sourceData, 'Hawaii', 8, 51);
            this.scaleState(sourceData, 'Puerto Rico', 10, -25);
        }
        bgView.data(sourceData.rows);
        bgView.tooltip(false);
        bgView.polygon().position('longitude*latitude').style({
            fill: '#fff',
            stroke: '#ccc',
            lineWidth: 1,
        })
    }

    /**
     * 用户可视化数据
     */
    public drawDataSetUserView(
        sourceData: IUSAStateEpidemic[], 
        range: { maxConfirm: number, minConfirm: number },
        view: View
    ) {
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
            .source(sourceData)
            .transform({
                geoDataView: this.mapDataView,
                field: 'nameMap',
                type: 'geo.region',
                as: ['longitude', 'latitude'],
            });
        view.data(userDv.rows);
        view.scale({
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
        view.polygon()
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
        view.interaction('element-active');
        view.interaction('state-click');
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

        this.initOptions();

        this.backgroundView = this.chart.createView();
        this.view = this.chart.createView();

        this.dataset = new DataSet();
        this.mapDataView = this.dataset.createView('back')
            .source(this.mapData, {
                type: 'GeoJSON',
            });

        this.draw(this.mapDataView, this.epidemicData);

        this.handleChartActions();

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
