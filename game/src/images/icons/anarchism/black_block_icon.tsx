import type { SvgIconProps } from '@mui/material';
import type { FunctionComponent } from 'react';

import CustomIcon from '../custom_icon';
import IconSrc from './black_block.svg?react';

const BlackBlockIcon: FunctionComponent<SvgIconProps> = ({ ...props }) => {
	return <CustomIcon svg={IconSrc} {...props} />;
};

export default BlackBlockIcon;
