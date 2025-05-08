import { useGameSession } from ':hooks/use_game_session';
import { Box, Button, Container, Grid, Stack, Typography, useTheme } from '@mui/material';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import style from './lobby_select.module.scss';

import { useConfirmation } from ':hooks/use_confirmation';
import { useGame } from ':hooks/use_game';
import NoMeetingRoomIcon from '@mui/icons-material/NoMeetingRoom';
import PublicIcon from '@mui/icons-material/Public';
import { useNavigate } from 'react-router-dom';
import LobbyCard from './lobby_card';
import LobbySelectCreateLobby from './lobby_select_create_lobby';

const LobbySelectScreen: React.FC = () => {
	const { palette } = useTheme();
	const { t } = useTranslation(['lobby', 'common']);
	const { enqueueConfirmation } = useConfirmation();
	const { username, lobbies, currentLobby } = useGameSession();
	const { gameInstance } = useGame();
	const navigate = useNavigate();

	const [createLobbyOpen, setCreateLobbyOpen] = useState(false);

	useEffect(() => {
		if (!gameInstance) return;
		gameInstance.state.server?.requestLobbies();
	}, [gameInstance]);

	useEffect(() => {
		if (currentLobby) navigate('/lobby');
	}, [currentLobby, navigate]);

	const handleDisconnect = () => {
		enqueueConfirmation({
			title: t('common:disconnect'),
			description: t('common:disconnect_desc'),
			onConfirm() {
				gameInstance?.state.disconnectFromCurrentServer();
			},
		});
	};

	return (
		<Container>
			<Grid
				container
				className={style.screen}
				style={{ backgroundColor: palette.background.default }}
				justifyContent='center'
				alignContent='start'
			>
				<LobbySelectCreateLobby open={createLobbyOpen} setOpen={setCreateLobbyOpen} />

				<Stack spacing={5} width='100%' height='100%' padding='2em'>
					<Box display='flex' width='100%' justifyContent='space-between' className={style.topMenu}>
						<Box display='flex' flexDirection='column'>
							<Typography variant='h4'>
								<PublicIcon
									style={{ marginRight: '0.5em', fontSize: '1em', verticalAlign: 'middle' }}
								/>
								{t('lobby:lobbies')}
							</Typography>
							<Typography variant='caption'>{`${t('common:playing_as')} ${username}`}</Typography>
						</Box>

						<Box display='flex' alignContent='center'>
							<Button
								disabled={!lobbies || lobbies.lobbies.length === lobbies.max_lobbies}
								sx={{ marginRight: '1em' }}
								onClick={() => setCreateLobbyOpen(true)}
							>
								{t('lobby:create_lobby')}
							</Button>
							<Button variant='outlined' onClick={handleDisconnect}>
								{t('common:disconnect')}
							</Button>
						</Box>
					</Box>

					<Box flex='1 1 auto'>
						{lobbies?.lobbies.length ? (
							<Grid container spacing={{ xs: 2 }}>
								{lobbies.lobbies.map(lobby => (
									<Grid key={lobby.name} size={{ xs: 4 }}>
										<LobbyCard
											lobby={lobby}
											onJoinAttempt={() => gameInstance?.state.server?.joinLobby(lobby.name)}
										/>
									</Grid>
								))}
							</Grid>
						) : (
							<Box
								display='flex'
								flexDirection='column'
								width='100%'
								height='100%'
								justifyContent='center'
								alignItems='center'
								color='dimgrey'
							>
								<NoMeetingRoomIcon fontSize='inherit' sx={{ fontSize: '5em' }} />
								<Typography variant='h5'>{t('lobby:no_lobbies')}</Typography>
								<Typography variant='body1'>{t('lobby:no_lobbies_desc')}</Typography>
							</Box>
						)}
					</Box>
				</Stack>
			</Grid>
		</Container>
	);
};

export default LobbySelectScreen;
