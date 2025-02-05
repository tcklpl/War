import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CreditsScreen from './credits_screen';

it('renders', () => {
	render(
		<MemoryRouter>
			<CreditsScreen />
		</MemoryRouter>,
	);
});
