import {render, screen} from '@testing-library/react';

import {Logo} from './logo';
import {withRouter} from '../../mocks/mocks';

describe('Logo component', () => {
  it('Should render component correctly', () => {
    render(withRouter(<Logo/>));

    expect(screen.getAllByText(/W/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/T/i)).toBeInTheDocument();
  });
});
