import { Component, Vue, Prop } from 'vue-property-decorator';
import { View, Chart } from '@antv/g2';
import USAEpidemic from '@/mock/usa-epidemic.json';

@Component({})
export default class TotalTrend extends Vue {
    public chart!: View;

    public getData() {
        const { data } = USAEpidemic;
        const res = data.map((item: any) => {
            return {
                confirm: item.confirm,
                date: item.y + '.' + item.date,
                dead: item.dead,
                heal: item.heal,
            };
        });
        return res;
    }

    public mounted() {
        this.chart = new Chart({
            container: 'total-trend__container',
            autoFit: true,
            height: 150,
            width: 560,
        });

        const data = this.getData();
        this.chart.data(data);

        this.chart.scale('confirm', {
            alias: '确诊人数',
            min: 0,
            max: 25000000,
        });
        this.chart.scale('heal', {
            alias: '治愈人数',
            min: 0,
            max: 25000000,
        });
        this.chart.scale('dead', {
            alias: '死亡人数',
            min: 0,
            max: 25000000,
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

        this.chart.line().position('date*confirm').color('red');
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
                >美国疫情总体趋势</div>
                <div id='total-trend__container'>
                </div>
            </div>
        );
    }
}
