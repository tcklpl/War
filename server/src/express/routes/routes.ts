import type { ConfigManager } from '../../config/config_manager';
import type { CryptManager } from '../../crypt/crypt_manager';
import type { GameServer } from '../../game/game_server';
import type { ExpressRoute } from './route';
import { RouteLogin } from './route_login';
import { RouteServerInfo } from './route_server_info';

export class ExpressRoutes {
	private _routes!: ExpressRoute[];

	constructor(
		protected _configManager: ConfigManager,
		protected _cryptManager: CryptManager,
		protected _gameServer: GameServer,
	) {}

	initialize() {
		this._routes = [
			new RouteServerInfo(this._configManager, this._cryptManager, this._gameServer),
			new RouteLogin(this._configManager, this._cryptManager, this._gameServer),
		];
	}

	get routes() {
		return this._routes;
	}
}
