import {render, screen} from '@testing-library/react';

import {PlayIcon} from './play-icon';

describe('Pause icon component', () => {
  it('Should render component correctly', () => {
    render(<PlayIcon/>);

    expect(screen.getByText('Play')).toBeInTheDocument();
  });
});
