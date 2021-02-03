import { IStateInterface } from '@/interfaces';
import { MutationTree } from 'vuex';
import * as types from './mutationTypes';

export const mutations: MutationTree<IStateInterface> = {
    setCityName(state,name){
        state.cityName = name;
    }
};
