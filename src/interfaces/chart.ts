export interface IChartBoatdPropType {
    width: number;
    height: number;
}

interface IAxisConfig {
    property: string | string[];
}

export interface IChartConfig {
    showAxis: boolean;
    axisConfig?: IAxisConfig;
}
