export const isInRange = (value: number, min?: number, max?: number): boolean => {
    if (min && max) {
        return value >= min && value <= max;
    }
    if (min && !max) {
        return isGreaterThan(value, min);
    }
    if (!min && max) {
        return isGreaterThan(value, max);
    }
    return false;
};

export const isGreaterThan = (value: number, min: number): boolean => {
    return value >= min;
};
export const isLessThan = (value: number, max: number): boolean => {
    return value <= max;
};
