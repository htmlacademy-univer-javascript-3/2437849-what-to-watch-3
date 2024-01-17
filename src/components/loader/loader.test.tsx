import {render, screen} from '@testing-library/react';

import {Loader} from './loader';

describe('Loader component', () => {
  it('Should render component correct', () => {
    render(<Loader/>);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
