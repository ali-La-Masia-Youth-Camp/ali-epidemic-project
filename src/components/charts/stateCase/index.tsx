import { Component, Vue } from 'vue-property-decorator';
import StateFigure from '@/mock/foreign-list.json';
import './style.scss';

@Component({})
export default class StateCases extends Vue {
    public renderStateFigures() {
        const { children: data } = StateFigure.data;
        return data.map((state: any) => {
            const confirm = (state.confirm / 10000).toFixed(1) + '万';
            const heal = (state.heal / 10000).toFixed(1) + '万';
            const dead = (state.dead / 10000).toFixed(1) + '万';
            return (
                <li class='state-figure__content-item'>
                    <span>{ state.name }</span>
                    <span>{ confirm }</span>
                    <span>{ heal }</span>
                    <span>{ dead }</span>
                </li>
            );
        });
    }

    public render() {
        return (
            <div class='state-cases'>
                <div class='title'>美国各州疫情</div>
                <div class='state-figure__content'>
                    <div class='state-figure__content-header'>
                        <span>州</span>
                        <span>确诊</span>
                        <span>治愈</span>
                        <span>死亡</span>
                    </div>
                    <ul class='state-figure__content-list'>
                        {
                            this.renderStateFigures()
                        }
                    </ul>
                </div>
            </div>
        );
    }
}
