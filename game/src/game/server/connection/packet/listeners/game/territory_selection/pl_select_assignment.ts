import { PacketListener } from '../../packet_listener';

export class PLGameInitialTerritorySelectionAssignment extends PacketListener {
	register(): void {
		this.socket.on('gInitialTerritorySelectionAssignment', (player, territory, reason) => {
			if (!this.server.currentLobby) return;
			game.events.dispatchEvent('onTerritorySelectionPlayerAssignment', player, territory, reason);
		});
	}
}
