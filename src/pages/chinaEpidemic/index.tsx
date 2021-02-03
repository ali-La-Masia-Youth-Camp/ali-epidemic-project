import {Component, Vue} from 'vue-property-decorator';
import Table from './component/table.vue';
import City from './component/city.vue';
import Trend from './component/trend.vue';
import Asym from './component/asymptomatic.vue';
import Map from './component/map.vue';
import './style.scss';

@Component({
    components: {
        Table,
        City,
        Trend,
        Asym,
    },
})
export default class ChinaEpidemic extends Vue {
    public render() {
        return (
             <div class = 'fullpage-container__section' >
                <div id = 'china-container' class='china-container fix'>
                <div class='header'>
                    <h1 class='header-title'>中国模块</h1>
                </div>
                <div class='wrapper'>
                    <div class='content'>
                        <div class='col col-l'>
                            <div class='xpanel-wrapper xpanel-wrapper-40'>
                                <div class='xpanel xpanel-l-t'>
                                    <div class='title'>本月疫情严重城市</div>
                                    <div class='display'>
                                        <City></City>
                                    </div>
                                </div>
                            </div>
                            <div class='xpanel-wrapper xpanel-wrapper-60'>
                                <div class='xpanel xpanel-l-b'>
                                    <div class='title'>本周新增病例无症状占比</div>
                                    <div class='display'>
                                        <Asym></Asym>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='col col-c'>
                            <div class='xpanel-wrapper xpanel-wrapper-75'>
                                <div class='xpanel no-bg'>
                                    <Map></Map>
                                </div>
                            </div>
                            <div class='xpanel-wrapper xpanel-wrapper-25'>
                                <div class='xpanel xpanel-c-b'>
                                    <div class='title title-long'>全国新增病例趋势</div>
                                    <div class='display'>
                                        <Trend></Trend>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='col col-r'>
                            <div class='xpanel-wrapper xpanel-wrapper-100'>
                                <div class='xpanel xpanel-r-t'>
                                <div class='title'>近3天新增确诊病例</div>
                                    <div class='display'>
                                        <Table></Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}
