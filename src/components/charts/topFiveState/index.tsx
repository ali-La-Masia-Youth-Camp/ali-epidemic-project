import { Component, Vue, Prop } from 'vue-property-decorator';
import { View, Chart } from '@antv/g2';
import StateFigure from '@/mock/foreign-list.json';
import SCALE from '@/common/size';

@Component({})
export default class TopFiveState extends Vue {
    public chart!: View;

    public getData() {
        const { children } = StateFigure.data;
        const copy = [...children];
        const res = [];
        copy.sort((a, b) => b.confirm - a.confirm);
        for (let i = 0; i < 5; i++) {
            res.push(copy[i]);
        }
        return res;
    }

    public mounted() {
        this.chart = new Chart({
            container: 'top-five-state__container',
            autoFit: true,
            height: 200 * SCALE,
        });

        const data = this.getData();
        this.chart.data(data);

        this.chart.scale('confirm', {
            alias: '确诊人数',
        });

        this.chart.axis(true);

        this.chart.coordinate().transpose();

        this.chart
            .interval()
            .position('name*confirm')
            .color('red');
        this.chart.interaction('element-active');

        data.forEach((item) => {
            this.chart
                .annotation()
                .text({
                    position: [item.name, item.confirm],
                    content: () => {
                        return (item.confirm / 10000).toFixed(1) + '万';
                    },
                    style: {
                        textAlign: 'center',
                        fill: '#ffffff',
                    },
                    offsetY: 0,
                    offsetX: -22,
                });
        });

        this.chart.render();
    }

    public render() {
        return (
            <div
                class='top-five__container'
                style={{height: '100%'}}
            >
                <div
                    class='title'
                    style={{
                        padding: '16px 18px',
                    }}
                >州疫情人数Top5</div>
                <div id='top-five-state__container'>
                </div>
            </div>
        );
    }
}
