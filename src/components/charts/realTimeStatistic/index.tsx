import { Component, Vue } from 'vue-property-decorator';
import USAEpidemic from '@/mock/usa-epidemic.json';
import './style.scss';

@Component({})
export default class RealTimeStatistic extends Vue {
    public figures = {
        confirm: 0,
        confirmNew: 0,
        heal: 0,
        dead: 0,
    };

    public getData() {
        const lastIndex = USAEpidemic.data.length - 1;
        const { confirm, confirm_add, heal, dead } = USAEpidemic.data[lastIndex];
        return {
            confirm,
            confirmNew: confirm_add,
            heal,
            dead,
        };
    }

    public mounted() {
        this.figures = this.getData();
    }

    public render() {
        return (
            <div class='statistic-container'>
                <div class='title'>实时统计</div>
                <div class='statistic-chart-container'>
                    <div class='statistic-item confirm-sum'>
                        <div class='iconbox'>
                            <i class='iconfont icon-leiji'></i>
                        </div>
                        <div class='statistic-content'>
                            <div class='sub-title'>累计确诊</div>
                            <div class='figure'>
                                { this.figures.confirm }
                            </div>
                        </div>
                    </div>
                    <div class='statistic-item confirm-new'>
                        <div class='iconbox'>
                            <i class='iconfont icon-xinzeng'></i>
                        </div>
                        <div class='statistic-content'>
                            <div class='sub-title'>本日新增</div>
                            <div class='figure'>
                                { this.figures.confirmNew }
                            </div>
                        </div>
                    </div>
                    <div class='statistic-item heal-sum'>
                        <div class='iconbox'>
                            <i class='iconfont icon-yiliaoshizijia'></i>
                        </div>
                        <div class='statistic-content'>
                            <div class='sub-title'>治愈总数</div>
                            <div class='figure'>
                                { this.figures.heal }
                            </div>
                        </div>
                    </div>
                    <div class='statistic-item death-sum'>
                        <div class='iconbox'>
                            <i class='iconfont icon-siwangxunzang'></i>
                        </div>
                        <div class='statistic-content'>
                            <div class='sub-title'>死亡总数</div>
                            <div class='figure'>
                                { this.figures.dead }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
