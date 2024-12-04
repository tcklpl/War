import type { SvgIconProps } from '@mui/material';
import type { FunctionComponent } from 'react';

import CustomIcon from '../custom_icon';
import IconSrc from './offensive_maniac.svg?react';

const OffensiveManiacIcon: FunctionComponent<SvgIconProps> = ({ ...props }) => {
    return <CustomIcon svg={IconSrc} {...props} />;
};

export default OffensiveManiacIcon;
