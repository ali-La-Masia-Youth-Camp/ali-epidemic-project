import { Component, Vue, Prop } from 'vue-property-decorator';
import { CreateElement } from 'vue';
import { IChartBoatdPropType } from '@/interfaces/chart';
import TopFiveState from '@/components/charts/topFiveState';
import TopFiveDeath from '@/components/charts/topFiveDeath';
import TotalTrend from '@/components/charts/totalTrend';
import AddTrend from '@/components/charts/addTrend';
import SoccerTrend from '@/components/charts/soccerTrend';
import RealTimeStatistic from '@/components/charts/realTimeStatistic';
import StateCases from '@/components/charts/stateCase';
import './style.scss';
import SCALE from '@/common/size';

@Component({
    components: {
        TopFiveDeath,
        TopFiveState,
        AddTrend,
        RealTimeStatistic,
        StateCases,
        TotalTrend,
    },
})
export default class ChartBoard extends Vue {
    @Prop({
        default: () => ({
            height: 280 * SCALE,
        }),
    })
    public styleConfig!: IChartBoatdPropType;

    @Prop()
    public stateName!: string;

    @Prop()
    public name!: string;

    public renderCharts() {
        switch (this.name) {
            case 'topFive':
                return <TopFiveState />;
            case 'topFiveDeath':
                return <TopFiveDeath />;
            case 'totalTrend':
                return <total-trend/>;
            case 'statistic':
                return <RealTimeStatistic />;
            case 'addTrend':
                return <AddTrend />;
            case 'stateCase':
                return <StateCases />;
            case 'soccerTrend':
                return <SoccerTrend />;
        }
    }

    public render(h: CreateElement) {
        return (
            <div
                class='chart-board__container'
                style={{
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
