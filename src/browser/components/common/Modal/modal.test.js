import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Modal from './';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Modal Component', () => {
  it('cancel should not be called when clicked inside modal', () => {
    const onButtonClick = jest.fn();
    render(<Modal cancelCallback={onButtonClick} />);
    expect(screen.getByRole('dialog'));

    userEvent.click(screen.getByRole('dialog').firstChild);
    expect(onButtonClick).toHaveBeenCalledTimes(0);
  });
});
