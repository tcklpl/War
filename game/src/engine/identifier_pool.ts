import { IIdentifiable } from "./data/traits/identifiable";

export class IdentifierPool {

    private _currentID: number = 0;
    private _indentifiables: Map<number, IIdentifiable> = new Map();

    requestID(i: IIdentifiable) {
        const id = this._currentID++;
        this._indentifiables.set(id, i);
        return this._currentID++;
    }

    get(id: number) {
        return this._indentifiables.get(id);
    }

}