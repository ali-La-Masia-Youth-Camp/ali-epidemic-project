import { Component, Vue, Prop } from 'vue-property-decorator';
import './style.scss';

const COMMA = ',';
const NUMBER = '0123456789';

@Component({})
export default class NumberRoll extends Vue {
    @Prop()
    public rollNumber!: number;

    public $refs!: {
        rollContainer: HTMLDivElement,
    };

    public timer: number = 0;

    public get rollList() {
        const str = String(this.rollNumber).split('');
        const res: any[] = [];
        str.reverse().forEach((item, index) => {
            res.push(item);
            if (!((index + 1) % 3)) {
                res.push(',');
            }
        });
        return res.reverse();
    }

    public numberRollAnimate(box: any, index: number, delay: number) {
        // TODO: 这玩意写得太垃圾了，等等再优化吧。。
        let currentIndex = 0;
        const div: any = box.children[0];
        if (box.getAttribute('class').indexOf('comma-box') === -1) {
            // 每一位延迟滚动
            setTimeout(() => {
                const timer = setInterval(() => {
                    if (currentIndex === +this.rollList[index]) {
                        clearInterval(timer);
                    }
                    if (currentIndex !== 0) {
                        div.style.transform = `translate(0, -${currentIndex * 72}px)`;
                    }
                    if (currentIndex > 10) {
                        div.style.transitionProperty = `none`;
                        div.style.transform = `translate(0, 0)`;
                        currentIndex = 1;
                    } else {
                        div.style.transitionProperty = `transform`;
                        div.style.transitionDuration = `.5s`;
                        currentIndex++;
                    }
                }, 500 / (index * 1.01));
            }, delay);
        }
    }

    public mounted() {
        const { rollContainer } = this.$refs;
        Array.from(rollContainer.children).forEach((box, index) => {
            this.numberRollAnimate(box, index, index * 500);
        });
    }

    public render() {
        return (
            <div class='epidemic-number__visual'>
                <div class='title'>美国疫情数字</div>
                <div class='roll-container' ref='rollContainer'>
                    {
                        this.rollList.map((item) => {
                            return (
                                <div class={['visual-item', item === COMMA ? 'comma-box' : 'num-box']}>
                                    <div class={item === COMMA ? 'comma' : 'num'}>
                                        {
                                            item === COMMA
                                            ? COMMA
                                            : NUMBER.split('').map((str) => <div>{str}</div>)
                                        }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
