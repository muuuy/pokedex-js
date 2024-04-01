export class Pokemon {
    constructor(name=null, types=null, moves=null) {
        this._name = name;
        this._types = types;
        this._moves = moves;
    }

    set name(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }

    set types(types) {
        this._types = types;
    }
    get types() {
        return this._types;
    }

    set moves(moves) {
        this._moves = moves;
    }
    get moves() {
        return this._moves;
    }
}