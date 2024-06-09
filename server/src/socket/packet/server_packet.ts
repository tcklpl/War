import { ServerToClientPackets } from "../../../../protocol";
import { Player } from "../../game/player/player";

export type ServerPacketEventNames = keyof ServerToClientPackets;
export type ServerPacketEventParams<Event extends ServerPacketEventNames> = Parameters<ServerToClientPackets[Event]>;

export abstract class ServerPacket<E extends ServerPacketEventNames> {

    private _params: ServerPacketEventParams<E>;

    constructor(
        private _key: E,
        ...params: ServerPacketEventParams<E>
    ) {
        this._params = params;
    }

    dispatch(...targets: Player[]) {
        targets.forEach(t => {
            t.connection.emitPacket(this);
        });
    }

    get key() {
        return this._key;
    }

    get params() {
        return this._params;
    }

}