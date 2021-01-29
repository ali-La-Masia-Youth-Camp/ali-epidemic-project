import { Component, Vue } from 'vue-property-decorator';
import './style.scss';

@Component({})
export default class FirstPage extends Vue {
    public render() {
        return (
            <div class='fullpage-container__section first-page'>
                <div class='video-container'>
                    <video
                        controls
                        src='https://lark-video.oss-cn-hangzhou.aliyuncs.com/outputs/prod/yuque/2021/1226124/mp4/1610285747349-7e8637c2-66e6-419f-a660-00360fbe10e5.mp4?OSSAccessKeyId=LTAI4GGhPJmQ4HWCmhDAn4F5&Expires=1611919585&Signature=TSKNZOIiG9Uz0GtfJLNA72qkGPo%3D'
                    ></video>
                </div>
            </div>
        );
    }
}
