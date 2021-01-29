import { Component, Vue } from 'vue-property-decorator';
import './style.scss';

@Component({})
export default class FirstPage extends Vue {
    public render() {
        return (
            <div class='fullpage-container__section'>首屏</div>
        );
    }
}
