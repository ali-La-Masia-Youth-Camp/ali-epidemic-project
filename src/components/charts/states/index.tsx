import { Component, Vue } from 'vue-property-decorator';
import AllStateData from '@/mock/usa-state.json';
import StateNewData from '@/mock/foreign-list.json';
import { StateAbbrv2Full, IStateData, IStateDataItem } from '@/interfaces/chart';
import { IUSAStateEpidemic } from '@/interfaces';

@Component({})
export default class StateBase extends Vue {

    public getStateData(name: string) {
        const shorthandName = StateAbbrv2Full.get(name);
        const { children } = StateNewData.data;
        if (!shorthandName) {
            throw Error('没有匹配的州缩写名称');
        }
        const res: IStateData = {
            data: [],
            state: shorthandName,
            name,
            nameMap: children.find((child: IUSAStateEpidemic) => child.nameMap === name).name
        };
        AllStateData.forEach((stateData: IStateDataItem) => {
            if (stateData.state === shorthandName) {
                res.data.unshift(stateData);
            }
        });
        return res;
    }
}
