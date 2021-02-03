import { Component, Vue, Prop } from 'vue-property-decorator';
import { View, Chart } from '@antv/g2';
import USAEpidemic from '@/mock/usa-epidemic.json';
import SCALE from '@/common/size';

@Component({})
export default class AddTrend extends Vue {
    public chart!: View;

    public getData() {
        const { data } = USAEpidemic;
        const res = data.map((item: any) => {
            return {
                confirm_add: item.confirm_add,
                date: item.y + '.' + item.date,
            };
        });
        return res;
    }

    public mounted() {
        this.chart = new Chart({
            container: 'add-trend__container',
            autoFit: true,
            height: 150 * SCALE,
        });

        const data = this.getData();
        this.chart.data(data);

        this.chart.scale('confirm_add', {
            alias: '新增确诊人数',
        });

        this.chart.tooltip({
            showCrosshairs: true,
            shared: true,
        });

        this.chart.line().position('date*confirm_add').color('red');
        this.chart.interaction('element-active');

        this.chart.render();
    }

    public render() {
        return (
            <div
                class='add-trend'
                style={{height: '100%'}}
            >
                <div
                    class='title'
                    style={{
                        padding: '16px 18px',
                    }}
                >美国疫情总体趋势</div>
                <div id='add-trend__container'>
                </div>
            </div>
        );
    }
}
