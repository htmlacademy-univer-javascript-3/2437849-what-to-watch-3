import {render, screen} from '@testing-library/react';

import {NotFound} from './not-found';
import {withRouter} from '../../mocks/mocks';

describe('Not found component', () => {
  it('Should render component correctly', () => {
    render(withRouter(<NotFound/>));

    expect(screen.getByText('404 Page Not Found')).toBeInTheDocument();
  });
});
