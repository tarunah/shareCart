import React from 'react';
import sinon from 'sinon';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import SampleSelectorModal from './index';

describe('Sample Selector Modal', () => {
  it('should render iframe', () => {
    const toggleModal = sinon.spy();
    const cancelIconConfig = { show: true };
    const freeGiftUrl = 'https://www.myntra.com/';
    render(
      <SampleSelectorModal
        toggleModal={toggleModal}
        cancelIconConfig={cancelIconConfig}
        freeGiftUrl={freeGiftUrl}
      />
    );

    expect(screen.getByText('FREE GIFT OFFER')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByTestId('iframeLoader')).toBeInTheDocument();
    expect(screen.getByTestId('iframeFrg')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('modal-close'));
    expect(toggleModal.calledOnce).toBe(true);
  });
});
