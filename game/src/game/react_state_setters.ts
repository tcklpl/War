import type { GamePauseReason, LobbyListState, LobbyState } from ':protocol';
import type React from 'react';
import type { LobbyChatMessage } from './lobby/lobby_chat';
import type { WarGameLobby } from './lobby/war_game_lobby';
import type { WarGameSession } from './lobby/war_game_session';
import type { ReconnectionInfo } from './server/connection/reconnection_info';
import type { ServerConnection } from './server/connection/server_connection';
import type { LobbyExitReason } from './server/war_server';
import type { WarGame } from './war_game';

type Dispatcher<T> = React.Dispatch<React.SetStateAction<T>>;
type UndefinedDispatcher<T> = React.Dispatch<React.SetStateAction<T | undefined>>;

export class ReactStateSetters {
    readonly useGame = new ReactStateUseGame();
    readonly useGameSession = new ReactStateUseGameSession();
}

class ReactStateUseGame {
    setGameInstance!: (game: WarGame | undefined) => void;
}

class ReactStateUseGameSession {
    setUsername!: Dispatcher<string>;
    setReconnectionInfo!: UndefinedDispatcher<ReconnectionInfo>;
    setConnection!: UndefinedDispatcher<ServerConnection>;

    // Lobby states
    setLobbies!: UndefinedDispatcher<LobbyListState>;
    setCurrentLobby!: UndefinedDispatcher<WarGameLobby>;
    setCurrentLobbyState!: UndefinedDispatcher<LobbyState>;
    setChat!: Dispatcher<LobbyChatMessage[]>;
    setGameStartingIn!: UndefinedDispatcher<number>;

    // Game states
    setCurrentGameSession!: UndefinedDispatcher<WarGameSession>;
    setGTurnPlayerIndex!: Dispatcher<number>;
    setGPauseReason!: UndefinedDispatcher<GamePauseReason>;

    setGHoverI18nKey!: UndefinedDispatcher<string>;

    updateForLobbyExit!: (reason: LobbyExitReason | undefined) => void;
}
