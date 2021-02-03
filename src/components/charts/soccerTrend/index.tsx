import { Component, Vue, Prop } from 'vue-property-decorator';
import { View, Chart } from '@antv/g2';
import USAEpidemic from '@/mock/soccer-epidemic.json';

@Component({})
export default class TotalTrend extends Vue {
    public chart!: View;

    public getData() {
        const { data } = USAEpidemic;
        const res = data.map((item: any) => {
            return {
                confirm: item.confirm,
                date: item.y + '.' + item.date,
                add: item.confirm_add,
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
            alias: '累计确诊',
            min: 0,
            max: 600,
        });
        this.chart.scale('heal', {
            alias: '新增治愈',
            min: 0,
            max: 600,
        });
        this.chart.scale('add', {
            alias: '新增确诊',
            min: 0,
            max: 600,
        });

        this.chart.tooltip({
            showCrosshairs: true,
            shared: true,
        });

        this.chart.legend({
            custom: true,
            items: [
              { name: '累计确诊', value: 'confirm', marker: { symbol: 'circle', style: { fill: 'blue', color: '#eeeeee' } } },
              { name: '新增确诊', value: 'heal', marker: { symbol: 'hexagon', style: { fill: 'red', color: '#eeeeee' } } },
              { name: '新增治愈', value: 'add', marker: { symbol: 'square', style: { fill: 'green', color: '#eeeeee' } } },
            ],
        });

        this.chart.axis('add', false);
        this.chart.axis('heal', false);

        this.chart.line().position('date*confirm').color('blue');
        this.chart.line().position('date*add').color('red');
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
                >足坛疫情总体趋势</div>
                <div id='total-trend__container'>
                </div>
            </div>
        );
    }
}
