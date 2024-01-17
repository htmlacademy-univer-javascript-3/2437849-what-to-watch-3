import {render, screen} from '@testing-library/react';

import {DetailsTab} from './details-tab';
import {getTestFilm} from '../../mocks/mocks';

describe('Details tab component', () => {
  it('Should render component correctly', () => {
    const film = getTestFilm();
    const actor = film.starring[0];
    render(<DetailsTab film={film}/>);

    expect(screen.getByText(film.genre)).toBeInTheDocument();
    expect(screen.getByText(film.released)).toBeInTheDocument();
    expect(screen.getAllByText(film.director)[1]).toBeInTheDocument();
    expect(screen.getByText(actor)).toBeInTheDocument();
    expect(screen.getByText(`${film.runTime}m`)).toBeInTheDocument();
  });
});
