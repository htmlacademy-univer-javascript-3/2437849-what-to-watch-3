import {render, screen} from '@testing-library/react';

import {Footer} from './footer';
import {withRouter} from '../../mocks/mocks';

describe('Footer component', () => {
  it('Should render component correctly', () => {
    render(withRouter(<Footer/>));

    expect(screen.getByText('© 2019 What to watch Ltd.')).toBeInTheDocument();
  });
});
