import type { GameSocket } from '../../@types/server_socket';
import type { ConfigManager } from '../../config/config_manager';
import type { CryptManager } from '../../crypt/crypt_manager';
import type { GameServer } from '../../game/game_server';
import type { Player } from '../../game/player/player';
import type { Logger } from '../../log/logger';

export interface SocketRouteData {
	player: Player;
	socket: GameSocket;

	gameServer: GameServer;
	configManager: ConfigManager;
	cryptManager: CryptManager;
	logger: Logger;
}
