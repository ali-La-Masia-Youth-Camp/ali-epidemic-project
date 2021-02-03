import { Component, Vue, Emit } from 'vue-property-decorator';
import './style.scss';

@Component({
})
export default class FirstPage extends Vue {
    @Emit('handleEnter')
    public handleEnter() {
    }

    public render() {
        return (
            <div class='fullpage-container__section first-page'>
                <div class='video-container'>
                    <video
                        controls
                        src='https://bizsec-auth.alicdn.com/a9b5b21ee64d2b47/Qe9k4XSEr4zqvIg7131/lksnX55XbhVgiMgcQ6W_294264400306___hd.mp4?auth_key=1612108300-0-0-354e78d65a67c6164ec8405acb0e3bff'
                    ></video>
                </div>
                <div class='nav-next'>
                    <div class='nav-box'>
                        <div class='nav-background' onclick={this.handleEnter}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
