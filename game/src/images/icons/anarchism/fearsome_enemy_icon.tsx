import type { SvgIconProps } from '@mui/material';
import type { FunctionComponent } from 'react';

import CustomIcon from '../custom_icon';
import IconSrc from './fearsome_enemy.svg?react';

const FearsomeEnemyIcon: FunctionComponent<SvgIconProps> = ({ ...props }) => {
	return <CustomIcon svg={IconSrc} {...props} />;
};

export default FearsomeEnemyIcon;
