import {render, screen} from '@testing-library/react';

import {PauseIcon} from './pause-icon';

describe('Pause icon component', () => {
  it('Should render component correctly', () => {
    render(<PauseIcon/>);

    expect(screen.getByText('Pause')).toBeInTheDocument();
  });
});
