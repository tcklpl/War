import { PacketListener } from '../../packet_listener';

export class PLGameInitialTerritorySelectionTurn extends PacketListener {
    register(): void {
        this.socket.on('gInitialTerritorySelectionTurn', (player, timeout) => {
            if (!this.server.currentLobby) return;
        });
    }
}
