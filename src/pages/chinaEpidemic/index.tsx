import { Component, Vue } from 'vue-property-decorator';
import './style.scss';

@Component({})
export default class ChinaEpidemic extends Vue {
    public render() {
        return (
            <div class='fullpage-container__section'>中国疫情板块</div>
        );
    }
}
