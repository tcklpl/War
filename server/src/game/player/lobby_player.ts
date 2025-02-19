import { PlayerPartyNotSetError } from '../../exceptions/game_start/player_party_not_set_error';
import type { Game } from '../ingame/game';
import type { Lobby } from '../lobby/lobby';
import { PartyNotSet } from '../party/not_set';
import type { Party } from '../party/party';
import { GamePlayer } from './game_player';
import { Player } from './player';

export class LobbyPlayer extends Player {
	private _lobby?: Lobby;
	party: Party = new PartyNotSet();

	joinLobby(lobby: Lobby) {
		this._lobby = lobby;
		this._lobby.addPlayer(this);
	}

	leaveCurrentLobby() {
		this._lobby?.removePlayer(this);
		this._lobby = undefined;
		this.party = new PartyNotSet();
	}

	transformIntoGamePlayer(game: Game) {
		if (!this.party || this.party instanceof PartyNotSet) throw new PlayerPartyNotSetError(game, this);
		const gamePlayer = new GamePlayer(this.username, this.connection, this.party, game);
		this.morphInto(gamePlayer);
		return gamePlayer;
	}

	get lobby() {
		return this._lobby;
	}
}
