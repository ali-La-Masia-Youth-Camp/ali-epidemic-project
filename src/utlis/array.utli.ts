import { IUSAStateEpidemic } from '@/interfaces/mock.interface';

export const findMaxComfirmFromGeoData = <T = IUSAStateEpidemic>(array: T[]): T => {
    return array.reduce((prev: any, curv: any) => {
        return prev.confirm > curv.confirm ? prev : curv;
    }, array[0]);
};

export const findMinComfirmFromGeoData = <T = IUSAStateEpidemic>(array: T[]): T => {
    return array.reduce((prev: any, curv: any) => {
        return prev.confirm < curv.confirm ? prev : curv;
    }, array[0]);
};
