import {render, screen} from '@testing-library/react';

import {ShowMoreButton} from './show-more';
import {withRouter, withStore} from '../../mocks/mocks';

describe('Show more component', () => {
  it('Should render component correctly', () => {
    const store = withStore(withRouter(<ShowMoreButton/>));
    render(store.component);

    expect(screen.getByText('Show more')).toBeInTheDocument();
  });
});
