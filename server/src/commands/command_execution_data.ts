import type { WarServer } from '../war_server';

export interface CommandExecutionData {
	args: string[];
	server: WarServer;
}
