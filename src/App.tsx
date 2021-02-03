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

    public activeIndex: number = 0;

    public carouselOptions = {
        height: '100vh',
        direction: 'vertical',
        autoplay: false,
        initialIndex: 0,
    };

    public handleCarouselChange(currentIndex: number, lastIndex: number) {
        this.activeIndex = currentIndex;
    }

    public handleEnter() {
        this.$refs.carousel.setActiveItem(1);
    }

    public renderPages(h: CreateElement) {
        console.log('renderPages');
        const pages = Object.keys(this.$options.components as object);
        pages.splice(pages.findIndex((page: string) => page === 'App'), 1);
        return pages.map((page: string, index) => {
            return (
                <el-carousel-item key={page}>
                    {
                        this.activeIndex === index
                        ? h(this.$options.components![page], {
                            on: {
                                handleEnter: this.handleEnter,
                            },
                        })
                        : null
                    }
                </el-carousel-item>
            );
        });
    }

    public render(h: CreateElement) {
        return (
            <div id='app'>
                <el-carousel
                    onChange={this.handleCarouselChange}
                    {...{props: {...this.carouselOptions}}}
                    ref='carousel'
                >
                    { this.renderPages(h) }
                </el-carousel>
            </div>
        );
    }
}
