import { isInRange } from '@/utlis/number.utli';

const getBaseScale = () => {
    const BASE = 1;
    let scale = 1;
    const width = window.innerWidth;
    if (isInRange(width, 1400, 1500)) {
        scale = 1;
    }
    if (isInRange(width, 1500, 1600)) {
        scale = 1.15;
    }
    if (isInRange(width, 1600)) {
        scale = 1.5;
    }
    return BASE * scale;
};

let SCALE = getBaseScale();

window.addEventListener('resize', () => {
    SCALE = getBaseScale();
});

export default SCALE;
