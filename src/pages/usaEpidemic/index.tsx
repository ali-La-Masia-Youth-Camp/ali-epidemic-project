import { Component, Vue } from 'vue-property-decorator';
import { CreateElement } from 'vue';
import NumberRoll from '@/components/numberRoll';
import ChartBoard from '@/components/chartBoard';
import USAMap from '@/components/usaMap';
import TopFiveState from '@/components/charts/topFiveState';
import USAEpidemicJson from '@/mock/usa-epidemic.json';
import { IUSAEpidemicData } from '@/interfaces';
import './style.scss';

@Component({
    components: {
        NumberRoll,
        ChartBoard,
        USAMap,
    },
})
export default class UsaEpidemic extends Vue {
    public usaNewestData: IUSAEpidemicData = USAEpidemicJson.data[USAEpidemicJson.data.length - 1].confirm;

    public renderNumberRoll(h: CreateElement) {
        return h(this.$options.components!.NumberRoll, {
            props: {
                rollNumber: this.usaNewestData,
            },
        });
    }

    public render(h: CreateElement) {
        return (
            <div class='fullpage-container__section usa-epidemic'>
                <div class='left-container'>
                    <chart-board name='statistic'/>
                    <chart-board name='addTrend' styleConfig={{ width: 380, height: 220 }}/>
                    <chart-board name='stateCase' styleConfig={{ width: 350, height: 200 }}/>
                </div>
                <div class='middle-container'>
                    {
                        this.renderNumberRoll(h)
                    }
                    <USAMap/>
                    <chart-board
                        name='totalTrend'
                        styleConfig={{
                            width: 600,
                            height: 200,
                        }}
                    />
                </div>
                <div class='right-container'>
                    <chart-board name='topFive'/>
                    <chart-board name='topFiveDeath'/>
                </div>
            </div>
        );
    }
}
