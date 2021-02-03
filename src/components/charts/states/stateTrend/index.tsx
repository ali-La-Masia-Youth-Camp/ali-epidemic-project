import { Component, Prop } from 'vue-property-decorator';
import { StateAbbrv2Full, IStateData } from '@/interfaces/chart';
import StateBase from '..';

@Component({})
export default class StateTrend extends StateBase {
    @Prop()
    public stateName!: string;

    public data!: IStateData;

    public mounted() {
        this.data = this.getData(this.stateName);
        console.log(this.data);
    }

    public render() {
        return (
            <div>aaa</div>
        );
    }
}
