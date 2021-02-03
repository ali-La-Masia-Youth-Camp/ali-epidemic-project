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

export const StateAbbrv2Full = new Map([
    ['Alabama', 'AL'],
    ['Alaska', 'AK'],
    ['Arizona', 'AZ'],
    ['Arkansas', 'AR'],
    ['California', 'CA'],
    ['Colorado', 'CO'],
    ['Connecticut', 'CT'],
    ['Delaware', 'DE'],
    ['Florida', 'FL'],
    ['Georgia', 'GA'],
    ['Hawaii', 'HI'],
    ['Idaho', 'ID'],
    ['Illinois', 'IL'],
    ['Indiana', 'IN'],
    ['Iowa', 'IA'],
    ['Kansas', 'KS'],
    ['Kentucky', 'KY'],
    ['Louisiana', 'LA'],
    ['Maine', 'ME'],
    ['Maryland', 'MD'],
    ['Massachusetts', 'MA'],
    ['Michigan', 'MI'],
    ['Minnesota', 'MN'],
    ['Mississippi', 'MS'],
    ['Missouri', 'MO'],
    ['Montana', 'MT'],
    ['Nebraska', 'NE'],
    ['Nevada', 'NV'],
    ['New hampshire', 'NH'],
    ['New jersey', 'NJ'],
    ['New mexico', 'NM'],
    ['New York', 'NY'],
    ['North Carolina', 'NC'],
    ['North Dakota', 'ND'],
    ['Ohio', 'OH'],
    ['Oklahoma', 'OK'],
    ['Oregon', 'OR'],
    ['Pennsylvania', 'PA'],
    ['Rhode island', 'RI'],
    ['South carolina', 'SC'],
    ['South dakota', 'SD'],
    ['Tennessee', 'TN'],
    ['Texas', 'TX'],
    ['Utah', 'UT'],
    ['Vermont', 'VT'],
    ['Virginia', 'VA'],
    ['Washington', 'WA'],
    ['West Virginia', 'WV'],
    ['Wisconsin', 'WI'],
    ['Wyoming', 'WY'],
]);

export interface IStateDataItem {
    date: string;                                   // 日期 => '2021-02-01'
    state: string;                                  // 州名简称 => AL
    death: number;                                  // 死亡人数
    deathConfirmed: number;
    deathIncrease: number;                          // 较前一天死亡增加人数
    deathProbable: number;
    hospitalized: number;
    hospitalizedCumulative: number;
    hospitalizedCurrently: number;
    hospitalizedIncrease: number;
    inIcuCumulative: number;
    inIcuCurrently: number;
    negative: number;                               // 阴性人数
    negativeIncrease: number;                       // 阴性增加人数
    negativeTestsAntibody: number;
    negativeTestsPeopleAntibody: number;
    negativeTestsViral: number;
    onVentilatorCurrently: number;
    positive: number;                               // 阳性人数
    positiveCasesViral: number;
    positiveIncrease: number;                       // 阳性增加人数
    positiveScore: number;
    positiveTestsAntibody: number;
    positiveTestsAntigen: number;
    positiveTestsPeopleAntibody: number;
    positiveTestsPeopleAntigen: number;
    positiveTestsViral: number;
    recovered: number;
    totalTestEncountersViral: number;
    totalTestEncountersViralIncrease: number;
    totalTestResults: number;
    totalTestResultsIncrease: number;
    totalTestsAntibody: number;
    totalTestsAntigen: number;
    totalTestsPeopleAntibody: number;
    totalTestsPeopleAntigen: number;
    totalTestsPeopleViral: number;
    totalTestsPeopleViralIncrease: number;
    totalTestsViral: number;
    totalTestsViralIncrease: number;
}

export interface IStateData {
    name: string;
    data: IStateDataItem[];
    state: string;
    nameMap: string;
}
