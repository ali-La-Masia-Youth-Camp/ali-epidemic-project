import { Component, Vue, Prop } from 'vue-property-decorator';
import { View, Chart } from '@antv/g2';
import USAEpidemic from '@/mock/usa-epidemic.json';
import SCALE from '@/common/size';
import StateBase from '../states';
import { IStateData } from '@/interfaces/chart';

@Component({})
export default class TotalTrend extends StateBase {
    @Prop()
    public stateName!: string;

    /** 州的中文名称 */
    public stateNameMap: string = '';

    public get isState() {
        return this.stateName !== undefined;
    }

    public stateData!: IStateData;

    public chart!: View;

    public getData() {
        const { data } = USAEpidemic;
        let dataSource;
        if(this.stateName) {
            this.stateData = this.getStateData(this.stateName)
            dataSource = this.stateData.data;
            this.stateNameMap = this.stateData.nameMap;
        } else {
            dataSource = data;
        }
        const res = dataSource.map((item: any) => {
            return {
                confirm: item.confirm || item.positive,
                date: item.y ? item.y + '.' + item.date : item.date,
                dead: item.dead || item.death,
                heal: item.heal || item.recovered,
            };
        });
        console.log(res);
        return res;
    }

    public mounted() {
        this.chart = new Chart({
            container: 'total-trend__container',
            autoFit: true,
            height: 150 * SCALE,
        });

        this.chart.on('legend:click', (param: any) => {
            console.log(param);
        })

        console.log(this.stateName);

        const data = this.getData();
        this.chart.data(data);

        this.chart.scale('confirm', {
            alias: '确诊人数',
            min: this.isState ? 2900000 : 0,
            max: this.isState ? 3300000 : 25000000,
        });
        this.chart.scale('heal', {
            alias: '治愈人数',
            min: this.isState ? 500000 : 0,
            max: this.isState ? 4000000 : 25000000,
        });
        this.chart.scale('dead', {
            alias: '死亡人数',
            min: 0,
            max: this.isState ? 100000 : 25000000,
        });

        this.chart.tooltip({
            showCrosshairs: true,
            shared: true,
        });

        this.chart.legend({
            custom: true,
            items: [
              { name: '累计确诊', value: 'confirm', marker: { symbol: 'square', style: { fill: 'red', color: '#eeeeee' } } },
              { name: '累计死亡', value: 'dead', marker: { symbol: 'square', style: { fill: 'yellow', color: '#eeeeee' } } },
              { name: '累计治愈', value: 'heal', marker: { symbol: 'square', style: { fill: 'green', color: '#eeeeee' } } },
            ],
        });

        this.chart.axis('dead', false);
        this.chart.axis('heal', false);

        this.chart
            .line()
            .position('date*confirm')
            .color('red');
        this.chart.line().position('date*dead').color('yellow');
        this.chart.line().position('date*heal').color('green');
        this.chart.interaction('element-active');

        this.chart.render();
    }

    public render() {
        return (
            <div
                class='total-trend'
                style={{height: '100%'}}
            >
                <div
                    class='title'
                    style={{
                        padding: '16px 18px',
                    }}
                >
                    <span>
                        { 
                            this.stateName
                            ? this.stateNameMap + '州近14天趋势'
                            : '美国疫情总体趋势'
                        }
                    </span>
                </div>
                <div id='total-trend__container'>
                </div>
            </div>
        );
    }
}
