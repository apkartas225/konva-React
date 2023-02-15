import { makeAutoObservable } from "mobx";

interface ISisez {
    id: number | string;
    x: number;
    y: number;
    width: number,
}
class starsStore {
    sizesShapes: any = {};

    constructor() {
        makeAutoObservable( this );
    }

    setSize( { id, x, y, width }: ISisez ) {
        this.sizesShapes[ id ] = { x, y, width };
    }
}

export default new starsStore();