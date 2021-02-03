import { Component, Vue } from 'vue-property-decorator';
import DataSet from '@antv/data-set';
import { Chart, View, registerInteraction } from '@antv/g2';
import USAJson from '@/mock/usa.json';
import USAStateJson from '@/mock/foreign-list.json';
import USAEpidemicJson from '@/mock/usa-epidemic.json';
import { IUSAStateEpidemic, IUSAEpidemicData } from '@/interfaces';
import { findMaxComfirmFromGeoData, findMinComfirmFromGeoData } from '@/utlis/array.utli';
import SCALE from '@/common/size';
import './style.scss';

@Component({})
export default class USAMap extends Vue {
    public mapData!: any; // 原始地图数据

    public chart!: View;

    public view!: View;

    public mapDataView!: any;

    public backgroundView!: View;

    // 州 view
    public stateBgView!: View;

    public stateUserView!: View;

    public epidemicData!: IUSAStateEpidemic[];

    public isShowState: boolean = false;

    public dataset!: any;

    public clickTimes: number = 1;

    public $refs!: {
        refreshIcon: HTMLElement
    };

    /**
     * 对偏离美国整体地图较远的州的经纬度进行变换
     * @param source 需要进行变换的州的数据
     * @param name 州名
     * @param latStep 纬度变化步数
     * @param longStep 经度变化步数
     */
    public scaleState(name: string, latStep: number, longStep: number) {
        const stateIndex = this.mapDataView.rows.findIndex((row: any) => row.name === name);
        const state = this.mapDataView.rows[stateIndex];
        const { longitude, latitude } = state;
        const scaleLatitude = latitude.map((coord: number) => {
            return coord + latStep;
        });
        const scaleLongitude = longitude.map((coord: number) => {
            return coord + longStep;
        });
        state.latitude = scaleLatitude;
        state.longitude = scaleLongitude;
        this.mapDataView.rows.splice(stateIndex, 1, state);
    }

    /**
     * 设置 tooltip
     */
    public setTooltip() {
        if (this.chart) {
            this.chart.tooltip({
                showTitle: false,
            });
        }
    }

    /**
     * 设置 scale
     */
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

    /**
     * 设置坐标轴
     * @param axis 是否显示坐标轴
     */
    public setAxis(axis: boolean) {
        if (this.chart) {
            this.chart.axis(axis);
        }
    }

    /**
     * 设置图例
     * @param legend 是否显示，如果传入 string 表示需要显示的字段
     * @param config 显示配置
     */
    public setLegend(legend: boolean | string, config?: any) {
        if (this.chart) {
            if (typeof legend === 'boolean') {
                this.chart.legend(legend);
            } else {
                this.chart.legend(legend, config);
            }
        }
    }

    /**
     * Chart初始化操作，包括设置 tooltip，设置 scale，设置图例(legend)，设置坐标轴
     */
    public initOptions() {
        this.setTooltip();
        this.setScale();
        this.setLegend(false);
        this.setAxis(false);
    }

    /**
     * 注册 Chart 的动作
     */
    public handleChartActions() {
        this.registerStateClick();

        this.listenChartClick();
    }

    /**
     * 注册地图点击手势
     */
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

    /**
     * 获取点击的州的数据
     * @param cb 回调函数，入参为获取到的州数据
     */
    public getClickStateData(cb: any) {
        this.chart.on('element:click', (ev: any) => {
            const stateData = ev.data.data;
            if (stateData) {
                cb(stateData);
            }
        });
    }

    /**
     * 获取州的坐标数据
     * @param name 州名字
     */
    public getStateCoordinates(name: string) {
        return {
            type: 'FeatureCollection',
            features: [ this.mapData.features.find((state: any) => state.properties.name === name) ],
        };
    }

    public listenChartClick() {
        this.getClickStateData((stateData: IUSAStateEpidemic) => {
            this.backgroundView.clear();
            this.view.clear();
            const region = {
                region: {
                    start: { x: 0.2, y: 0.1 },
                    end: { x: 0.7, y: 0.9 },
                },
            };
            this.isShowState = true;
            const stateCoords = this.getStateCoordinates(stateData.nameMap);
            let stateMapView;
            stateMapView = this.dataset.getView(stateData.nameMap);
            // 如果对应州的 view 不存在则创建新的
            if(!stateMapView) {
                stateMapView = this.dataset.createView(stateData.nameMap)
                    .source(stateCoords, {
                        type: 'GeoJSON',
                    });
            }
            this.stateBgView = this.chart.createView(region);
            this.stateUserView = this.chart.createView(region);
            this.draw(stateMapView, [stateData], this.stateBgView, this.stateUserView);
            this.renderChart();
        });
    }

    public draw(
        coordViewData: any,
        epidemicData: IUSAStateEpidemic[],
        bgView = this.backgroundView,
        userView = this.view,
    ) {
        const maxConfirmState = findMaxComfirmFromGeoData(this.epidemicData);
        const minConfirmState = findMinComfirmFromGeoData(this.epidemicData);

        this.drawDataSetBackground(coordViewData, bgView);

        this.drawDataSetUserView(epidemicData, {
            maxConfirm: maxConfirmState.confirm,
            minConfirm: minConfirmState.confirm,
        }, userView);
    }

    /**
     * 美国地图背景
     */
    public drawDataSetBackground(sourceData: any, bgView: View) {
        bgView.data(sourceData.rows);
        bgView.tooltip(false);
        bgView.polygon().position('longitude*latitude').style({
            fill: '#fff',
            stroke: '#ccc',
            lineWidth: 1,
        });
    }

    /**
     * 用户可视化数据
     */
    public drawDataSetUserView(
        sourceData: IUSAStateEpidemic[],
        range: { maxConfirm: number, minConfirm: number },
        view: View,
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
            });
        view.interaction('element-active');
        view.interaction('state-click');
    }

    /**
     * 从州地图返回美国地图
     */
    public handleRefresh() {
        const { refreshIcon } = this.$refs;
        refreshIcon.style.transform = `rotate(${360 * this.clickTimes}deg)`;

        this.clickTimes++;

        // 1. 清空州地图 View
        this.stateBgView.clear();
        this.stateUserView.clear();

        // 2. 绘制美国地图
        this.draw(this.mapDataView, this.epidemicData);

        this.renderChart();

        // 3. 不渲染刷新 icon
        this.isShowState = false;
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
            height: 430 * SCALE,
            width: window.innerWidth / 2.1,
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

        /** 改变两个州的坐标使其不至于离美国本土太远而导致的本土地图过小 */
        if (this.mapDataView.rows.length > 1) {
            this.scaleState('Hawaii', 8, 51);
            this.scaleState('Puerto Rico', 10, -25);
        }

        this.draw(this.mapDataView, this.epidemicData);

        this.handleChartActions();

        this.renderChart();
    }

    public render() {
        return (
            <div
                id='usa-map__container'
                style={{
                    width: '100%',
                }}
            >
                {
                    this.isShowState ? 
                    <i
                        ref='refreshIcon'
                        class='iconfont icon-refresh'
                        onclick={this.handleRefresh}
                    ></i>
                    : null
                }
            </div>
        );
    }
}
