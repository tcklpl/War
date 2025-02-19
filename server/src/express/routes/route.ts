import { Router } from 'express';
import type { ConfigManager } from '../../config/config_manager';
import type { CryptManager } from '../../crypt/crypt_manager';
import type { GameServer } from '../../game/game_server';

export abstract class ExpressRoute {
	readonly router = Router();
	constructor(
		protected _configManager: ConfigManager,
		protected _cryptManager: CryptManager,
		protected _gameServer: GameServer,
	) {
		this.register();
	}

	abstract register(): void;
}
