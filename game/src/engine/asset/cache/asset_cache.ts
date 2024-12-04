import type { IDBConnector } from '../../idb/idb_connector';
import { IDBController } from '../../idb/idb_controller';
import type { CachedAsset } from './cached_asset';
import type { CachedAssetIDBInterface } from './cached_asset_idb_interface';
import type { CachedAssetKey } from './cached_asset_key';

export class AssetCache extends IDBController<CachedAssetIDBInterface> {
    constructor(connection: IDBConnector) {
        super(connection, {
            name: 'asset-cache',
            keyPath: 'name',
        });
    }

    async getAsset(key: CachedAssetKey) {
        return await this.getOne(key.keyedName);
    }

    async putAsset(asset: CachedAsset) {
        return await this.add(asset.cachedAssetInterface);
    }
}
