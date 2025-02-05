import { PacketListener } from '../../packet_listener';

export class PLGameInitialTerritorySelectionAllowedTerritories extends PacketListener {
	register(): void {
		this.socket.on('gInitialTerritorySelectionAllowedTerritories', territories => {
			if (!this.server.currentLobby) return;
		});
	}
}
