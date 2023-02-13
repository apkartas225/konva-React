import { makeAutoObservable } from "mobx";

interface ISisez {
    id: number | string;
    x: number;
    y: number;
}

class starStore {
    sizesArr: any = {};

    constructor() {
        makeAutoObservable( this );
    }

    getSize() {

    }

    setSize( { id, x, y }: ISisez ) {
        this.sizesArr[ id ] = { x, y };
    }
}

export default new starStore();