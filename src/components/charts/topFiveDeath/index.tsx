import { Component, Vue, Prop } from 'vue-property-decorator';
import { View, Chart } from '@antv/g2';
import StateFigure from '@/mock/foreign-list.json';

@Component({})
export default class TopFiveState extends Vue {
    public chart!: View;

    public getData() {
        const { children } = StateFigure.data;
        const copy = [...children];
        const res = [];
        copy.sort((a, b) => b.dead - a.dead);
        for (let i = 0; i < 5; i++) {
            res.push(copy[i]);
        }
        return res;
    }

    public mounted() {
        this.chart = new Chart({
            container: 'top-five-death__container',
            autoFit: true,
            height: 200,
            width: 300,
            padding: [20, 36],
        });

        const data = this.getData();
        this.chart.data(data);

        this.chart.scale('dead', {
            alias: '死亡人数',
        });

        this.chart.axis(true);

        this.chart
            .interval()
            .position('name*dead')
            .color('#6E0F0F');
        this.chart.interaction('element-active');

        data.forEach((item) => {
            this.chart
                .annotation()
                .text({
                    position: [item.name, item.dead],
                    content: () => {
                        return (item.dead / 10000).toFixed(1) + '万';
                    },
                    style: {
                        textAlign: 'center',
                    },
                    offsetY: -30,
                });
        });

        this.chart.render();
    }

    public render() {
        return (
            <div
                class='death__container'
                style={{height: '100%'}}
            >
                <div
                    class='title'
                    style={{
                        padding: '16px 18px',
                    }}
                >州死亡人数Top5</div>
                <div id='top-five-death__container'>
                </div>
            </div>
        );
    }
}
