import { useConfig } from ':hooks/use_config';
import type { Theme } from '@mui/material';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import type React from 'react';
import { useEffect, useState } from 'react';
import themeDefaultDark from '../style/themes/default_dark';
import themeDefaultLight from '../style/themes/default_light';
import HUDAlert from './alert/hud_alert';
import WarCanvas from './canvas';
import HUDConfirmation from './confirmation/hud_confirmation';
import LegalDisclaimerScreen from './disclaimer/legal_disclaimer_screen';
import FailedToStartEngineScreen from './error/failed_to_start_engine/failed_to_start_engine_screen';
import HUDPerformance from './game/hud/debug/hud_performance';
import EscMenu from './game/hud/esc_menu/esc_menu';
import LoadingScreen from './loading/loading_screen';
import MenuRouter from './menu/router/menu_router';

const WarGameComponent: React.FC = () => {
	const { displayConfig } = useConfig();
	const [theme, setTheme] = useState(themeDefaultDark);

	useEffect(() => {
		let newTheme: Theme;
		switch (displayConfig.theme) {
			case 'light':
				newTheme = themeDefaultLight;
				break;
			case 'dark':
				newTheme = themeDefaultDark;
				break;
			default:
				newTheme = themeDefaultDark;
				break;
		}
		setTheme(newTheme);
	}, [displayConfig, theme]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline enableColorScheme />
			<LegalDisclaimerScreen />
			<FailedToStartEngineScreen />
			<LoadingScreen />
			<MenuRouter />
			<EscMenu />

			<SnackbarProvider />
			<HUDAlert />
			<HUDConfirmation />
			<HUDPerformance />
			<WarCanvas />
		</ThemeProvider>
	);
};

export default WarGameComponent;
