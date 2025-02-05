import { useGameSession } from ':hooks/use_game_session';
import type { GameParty } from ':protocol';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Button, Switch, Tab, Typography } from '@mui/material';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../lobby_screen.scss';
import LobbyPartyPageAnarchism from './party_pages/lobby_party_page_anarchism';

import AnarchismIcon from ':icons/anarchism/anarchism_icon';
import CapitalismIcon from ':icons/capitalism/capitalism_icon';
import FeudalismIcon from ':icons/feudalism/feudalism_icon';
import SocialismIcon from ':icons/socialism/socialism_icon';
import InfoIcon from '@mui/icons-material/Info';
import { TSXUtils } from '../../../../utils/tsx_utils';
import LobbyPageInfo from './party_pages/lobby_page_info';
import LobbyPartyPageCapitalism from './party_pages/lobby_party_page_capitalism';
import LobbyPartyPageFeudalism from './party_pages/lobby_party_page_feudalism';
import LobbyPartyPageSocialism from './party_pages/lobby_party_page_socialism';

const LobbyPartySelectorScreen = () => {
	const { t } = useTranslation(['lobby', 'parties']);
	const { username, currentLobby, currentLobbyState, gameStartingIn } = useGameSession();
	const playerParty = currentLobbyState?.players.find(p => p.name === username)?.party ?? 'not_set';
	const isGameStarting = gameStartingIn !== undefined;

	const [partyPage, setPartyPage] = useState<GameParty | 'none'>('none');
	const isPartyAvailable = !currentLobbyState?.players.find(p => p.party === partyPage);
	const partyPagePlayer = currentLobbyState?.players.find(p => p.party === partyPage);

	const getButtonText = () => {
		if (playerParty !== 'not_set') {
			return `${t('lobby:locked_as')} ${partyDecoratorMap.get(playerParty)?.name}`;
		}
		if (partyPage !== 'none') {
			return `${t('lobby:select')} ${partyDecoratorMap.get(partyPage)?.name}`;
		}
		return '?';
	};

	useEffect(() => {
		if (isGameStarting) {
			setPartyPage('none');
		}
	}, [isGameStarting]);

	const partyDecoratorMap = new Map<GameParty, { name: string; icon: ReactElement }>([
		['anarchism', { name: t('parties:anarchism'), icon: <AnarchismIcon /> }],
		['feudalism', { name: t('parties:feudalism'), icon: <FeudalismIcon /> }],
		['socialism', { name: t('parties:socialism'), icon: <SocialismIcon /> }],
		['capitalism', { name: t('parties:capitalism'), icon: <CapitalismIcon /> }],
	]);

	return (
		<Box
			sx={{
				bgcolor: 'background.paper',
				display: 'flex',
				flexGrow: 1,
				minHeight: 0,
				height: '100%',
				width: '100%',
			}}
		>
			<TabContext value={partyPage}>
				<Box sx={{ borderRight: 1, borderColor: 'divider' }}>
					<TabList onChange={(_, val) => setPartyPage(val)} orientation='vertical'>
						<Tab icon={<InfoIcon />} label='Lobby Info' value='none' />
						<Tab
							icon={<AnarchismIcon />}
							disabled={isGameStarting}
							label={t('parties:anarchism')}
							value={'anarchism'}
						/>
						<Tab
							icon={<FeudalismIcon />}
							disabled={isGameStarting}
							label={t('parties:feudalism')}
							value={'feudalism'}
						/>
						<Tab
							icon={<SocialismIcon />}
							disabled={isGameStarting}
							label={t('parties:socialism')}
							value={'socialism'}
						/>
						<Tab
							icon={<CapitalismIcon />}
							disabled={isGameStarting}
							label={t('parties:capitalism')}
							value={'capitalism'}
						/>
					</TabList>
				</Box>
				<Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
					<TabPanel value='none' className='lobby-growable-tab-panel'>
						<LobbyPageInfo />
					</TabPanel>
					<TabPanel value={'anarchism'} className='lobby-growable-tab-panel'>
						<LobbyPartyPageAnarchism />
					</TabPanel>
					<TabPanel value={'feudalism'} className='lobby-growable-tab-panel'>
						<LobbyPartyPageFeudalism />
					</TabPanel>
					<TabPanel value={'socialism'} className='lobby-growable-tab-panel'>
						<LobbyPartyPageSocialism />
					</TabPanel>
					<TabPanel value={'capitalism'} className='lobby-growable-tab-panel'>
						<LobbyPartyPageCapitalism />
					</TabPanel>

					{(partyPage !== 'none' || playerParty !== 'not_set') && (
						<Box
							justifySelf='end'
							marginTop='1em'
							padding='1em'
							display='flex'
							justifyContent='end'
							alignItems='center'
						>
							{partyPagePlayer && partyPage !== 'none' && (
								<Typography marginRight='1em'>
									{TSXUtils.replaceWithElement(
										t('lobby:party_is_selected_by'),
										{
											toReplace: '<PARTY>',
											value: k => (
												<Typography color='secondary' component='span' display='inline' key={k}>
													{partyDecoratorMap.get(partyPage)?.name}
												</Typography>
											),
										},
										{
											toReplace: '<PLAYER>',
											value: k => (
												<Typography color='secondary' component='span' display='inline' key={k}>
													{partyPagePlayer.name}
												</Typography>
											),
										},
									)}
								</Typography>
							)}
							<Button
								variant='outlined'
								disabled={(playerParty === 'not_set' && !isPartyAvailable) || isGameStarting}
								sx={{ verticalAlign: 'middle' }}
								onClick={() => {
									if (playerParty !== 'not_set') {
										currentLobby?.deselectCurrentParty();
									} else if (partyPage !== 'none') {
										currentLobby?.selectParty(partyPage);
									}
								}}
							>
								{getButtonText()}
								<Switch disabled checked={playerParty !== 'not_set'} />
							</Button>
						</Box>
					)}
				</Box>
			</TabContext>
		</Box>
	);
};

export default LobbyPartySelectorScreen;
