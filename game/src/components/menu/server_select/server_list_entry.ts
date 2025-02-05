import type { ServerConnectionCandidate } from ':game/server/connection/server_connection_candidate';
import type { ServerListSelectInfo } from ':game/server/server_list_select_info';

export interface ServerListEntry {
	info: ServerListSelectInfo;
	connectionCandidate: ServerConnectionCandidate;
}
