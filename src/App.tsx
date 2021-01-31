import { Component, Vue } from 'vue-property-decorator';
import { CreateElement } from 'vue';
import { ElCarousel } from 'element-ui/types/carousel';
import ChinaEpidemic from './pages/chinaEpidemic';
import UsaEpidemic from './pages/usaEpidemic';
import FirstPage from './pages/firstPage';
import SoccerEpidemic from './pages/soccerEpidemic';
import './style.scss';
import './reset.scss';
import './fonts/iconfont.css';

@Component({
    components: {
        FirstPage,
        ChinaEpidemic,
        UsaEpidemic,
        SoccerEpidemic,
    },
})
export default class App extends Vue {
    public $refs!: {
        carousel: ElCarousel,
    };

    public carouselOptions = {
        height: '100vh',
        direction: 'vertical',
        autoplay: false,
        initialIndex: 2,
    };

    public renderPages(h: CreateElement) {
        const pages = Object.keys(this.$options.components as object);
        pages.splice(pages.findIndex((page: string) => page === 'App'), 1);
        return pages.map((page: string, index) => {
            return (
                <el-carousel-item key={page}>
                    {
                        h(this.$options.components![page])
                    }
                </el-carousel-item>
            );
        });
    }

    public render(h: CreateElement) {
        return (
            <div id='app'>
                <el-carousel
                    {...{props: {...this.carouselOptions}}}
                    ref='carousel'
                >
                    { this.renderPages(h) }
                </el-carousel>
            </div>
        );
    }
}
