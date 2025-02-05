import type { FC } from 'react';
import { AlertProvider } from './hooks/use_alert';
import { ConfigProvider } from './hooks/use_config';
import { ConfirmationProvider } from './hooks/use_confirmation';
import { CrashProvider } from './hooks/use_crash';
import { GameProvider } from './hooks/use_game';
import { GameSessionProvider } from './hooks/use_game_session';

const Hooks: FC<{ children?: React.ReactNode }> = ({ children }) => {
	return (
		<AlertProvider>
			<ConfirmationProvider>
				<GameProvider>
					<ConfigProvider>
						<GameSessionProvider>
							<CrashProvider>{children}</CrashProvider>
						</GameSessionProvider>
					</ConfigProvider>
				</GameProvider>
			</ConfirmationProvider>
		</AlertProvider>
	);
};

export default Hooks;
