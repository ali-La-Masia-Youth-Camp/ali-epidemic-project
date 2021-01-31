export interface IUSAStateEpidemic {
    name: string;
    date: string;
    nameMap: string;
    isUpdated: boolean;
    confirmAdd: number;
    confirmAddCut: number;
    confirm: number;
    suspect: number;
    dead: number;
    heal: number;
}

export interface IUSAEpidemicData {
    y: string;
    date: string;
    confirm_add: number;
    heal: number;
    dead: number;
}
