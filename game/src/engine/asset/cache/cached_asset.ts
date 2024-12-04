import type { CachedAssetIDBInterface } from './cached_asset_idb_interface';
import type { CachedAssetKey } from './cached_asset_key';

export class CachedAsset {
    constructor(
        private readonly _key: CachedAssetKey,
        private readonly _data: any,
    ) {}

    get name() {
        return this._key.keyedName;
    }

    get data() {
        return this._data;
    }

    get cachedAssetInterface() {
        return {
            name: this.name,
            data: this._data,
        } as CachedAssetIDBInterface;
    }
}
