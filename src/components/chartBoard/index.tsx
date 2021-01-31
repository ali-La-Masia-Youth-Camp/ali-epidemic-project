import { Component, Vue, Prop } from 'vue-property-decorator';
import { CreateElement } from 'vue';
import { IChartBoatdPropType } from '@/interfaces/chart';
import TopFiveState from '@/components/charts/topFiveState';
import TopFiveDeath from '@/components/charts/topFiveDeath';
import TotalTrend from '@/components/charts/totalTrend';
import AddTrend from '@/components/charts/addTrend';
import RealTimeStatistic from '@/components/charts/realTimeStatistic';
import StateCases from '@/components/charts/stateCase';
import './style.scss';

@Component({
    components: {
        TopFiveDeath,
        TopFiveState,
        AddTrend,
        RealTimeStatistic,
        StateCases,
    },
})
export default class ChartBoard extends Vue {
    @Prop({
        default: () => ({
            width: 300,
            height: 280,
        }),
    })
    public styleConfig!: IChartBoatdPropType;

    @Prop()
    public name!: string;

    public renderCharts() {
        switch (this.name) {
            case 'topFive':
                return <TopFiveState/>;
            case 'topFiveDeath':
                return <TopFiveDeath/>;
            case 'totalTrend':
                return <TotalTrend/>;
            case 'statistic':
                return <RealTimeStatistic/>;
            case 'addTrend':
                return <AddTrend/>;
            case 'stateCase':
                return <StateCases/>;
        }
    }

    public render(h: CreateElement) {
        return (
            <div
                class='chart-board__container'
                style={{
                    width: `${this.styleConfig.width}px`,
                    height: `${this.styleConfig.height}px`,
                 }}
            >
                <div class='resize-container'>
                    <div class='border-sourround'>
                        <span class='top-left'></span>
                        <span class='top-top-left'></span>
                        <span class='top-top-right'></span>
                        <span class='top-right'></span>
                        <span class='bottom-left'></span>
                        <span class='bottom-bottom-left'></span>
                        <span class='bottom--bottom-right'></span>
                        <span class='bottom-right'></span>
                    </div>
                    <div class='chart-container'>
                        {
                            this.renderCharts()
                        }
                    </div>
                </div>
            </div>
        );
    }
}
