import { Logger } from '../../log/logger';
import { Command } from '../command';
import { type CommandExecutionData } from '../command_execution_data';

export class CommandConfig extends Command {
    constructor(logger: Logger) {
        super('config', 'Config', ['cfg'], "Commands about the server's configuration", logger);
        this.registerSubroute(new CommandConfigReload(logger.createChildContext('Reload')));
    }

    execute(_data: CommandExecutionData): boolean {
        return false;
    }
}

class CommandConfigReload extends Command {
    constructor(logger: Logger) {
        super('reload', 'Reload', [], 'Reloads the config', logger);
    }

    execute(data: CommandExecutionData): boolean {
        this._log.info('Reloading config...');
        (async () => {
            await data.server.configManager.loadConfig();
            this._log.info('Config reloaded');
        })();
        return true;
    }
}
