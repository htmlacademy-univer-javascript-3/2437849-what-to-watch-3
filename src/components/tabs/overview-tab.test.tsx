import {render, screen} from '@testing-library/react';

import {OverviewTab} from './overview-tab';
import {getTestFilm} from '../../mocks/mocks';

describe('Overview tab component', () => {
  it('Should render component correctly', () => {
    const film = getTestFilm();
    render(<OverviewTab film={film}/>);

    expect(screen.getByText(film.description)).toBeInTheDocument();
    expect(screen.getByText(film.rating)).toBeInTheDocument();
  });
});
