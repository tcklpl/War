import type { ClientToServerPackets, ServerToClientPackets } from ':protocol';
import type { Socket } from 'socket.io-client';

export type GameSocket = Socket<ServerToClientPackets, ClientToServerPackets>;
