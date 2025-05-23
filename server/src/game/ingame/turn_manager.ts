import { type GameConfig, type RoundState, type TurnAction, type TurnAllowedAction, type TurnPhase } from ':protocol';
import { Logger } from '../../log/logger';
import { ServerPacketGameError } from '../../socket/packet/game/game_error';
import { ServerPacketTurnAllowedActions } from '../../socket/packet/game/turn_allowed_actions';
import { ServerPacketUpdateRoundState } from '../../socket/packet/game/update_round_state';
import { Board } from '../board/board';
import { GamePlayer } from '../player/game_player';

export class TurnManager {
    /**
     * Round count, the round is a collection of all player turns.
     */
    private _round = 0;
    /**
     * Current turn index, this represents the index of the player (within the player list) that is currently
     * playing their turn.
     */
    private _turn = 0;
    private readonly _turnTimeoutTask?: NodeJS.Timeout;

    private _turnPhase: TurnPhase = 'over';
    private _turnAllowedActions: Map<string, TurnAllowedAction> = new Map();

    constructor(
        private readonly _players: GamePlayer[],
        private readonly _board: Board,
        private readonly _gameConfig: GameConfig,
        private readonly _log: Logger,
    ) {}

    startFirstTurn() {
        this.sendPacketsForCurrentTurn();
    }

    nextTurn() {
        // Update turn end for the current player
        this.currentTurnPlayer.party.onTurnEnd();

        // If this is the last player in the round
        if (this._turn >= this._players.length - 1) {
            this._players.forEach(p => p.party.onRoundEnd());
            this._round++;
            this._players.forEach(p => p.party.onRoundStart());
        }

        this._turn = (this._turn + 1) % this._players.length;

        this.sendPacketsForCurrentTurn();
    }

    private sendPacketsForCurrentTurn() {
        this.dispatchUpdateRoundState();

        this.currentTurnPlayer.party.onTurnStart();
        this._turnPhase = this.currentTurnPlayer.party.turnPhaseSequence[0];
        const allowedActions = this.currentTurnPlayer.party.calculateAllowedTurnActionsForPhase(this._turnPhase);
        new ServerPacketTurnAllowedActions(allowedActions).dispatch(this.currentTurnPlayer);

        this._turnAllowedActions = new Map();
        allowedActions.allowed_actions.forEach(aa => this._turnAllowedActions.set(aa.id, aa));
    }

    onTurnAction(player: GamePlayer, action: TurnAction) {
        if (!this._turnAllowedActions.has(action.allowed_action_id)) {
            new ServerPacketGameError('invalid action').dispatch(player);
            return;
        }
        // TODO: Process game action
    }

    private dispatchUpdateRoundState() {
        const state = {
            round: this._round,
            turn: this._turn,
            timeout: this._gameConfig.turn_timeout_seconds,
        } as RoundState;
        new ServerPacketUpdateRoundState(state).dispatch(...this._players);
    }

    get currentTurnPlayer() {
        return this._players[this._turn];
    }

    get round() {
        return this._round;
    }

    get turn() {
        return this._turn;
    }
}
