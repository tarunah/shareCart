import React from 'react';
import Button from '.';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Button common Comp tested with RTL', () => {
  it('should show label', () => {
    render(<Button>xyz</Button>);
    expect(screen.getByText('xyz'));
    expect(screen.getByTestId('button'));
  });
  it('should call onClickHandler', () => {
    const onClickHandler = jest.fn();
    render(<Button onClick={onClickHandler}>xyz</Button>);
    userEvent.dblClick(screen.getByText('xyz'));
    expect(onClickHandler).toHaveBeenCalledTimes(2);
  });
});
