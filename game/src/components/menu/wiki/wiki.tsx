import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

type WikiPageProps = {};

const WikiPage: FunctionComponent<WikiPageProps> = () => {
	const { t } = useTranslation([]);

	return <></>;
};

export default WikiPage;
