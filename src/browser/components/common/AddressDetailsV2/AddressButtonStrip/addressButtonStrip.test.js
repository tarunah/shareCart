import React from 'react';
import sinon from 'sinon';
import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import AddressButtonStrip from './';
import Strings from 'commonBrowserUtils/Strings';

describe('AddressButton Strip', () => {
  it('should show the confirm,edit and delete button in first mount', () => {
    render(
      <AddressButtonStrip
        isDeliveringHere={false}
        id={123}
        onAddressConfirmation={() => {}}
        handleEditAddressClick={() => {}}
        handleDeleteAddressClick={() => {}}
      />
    );

    expect(screen.queryByText(Strings.DELIVER_HERE)).toBeInTheDocument();
    expect(screen.queryByText(Strings.EDIT)).toBeInTheDocument();
    expect(screen.getByRole('deleteIcon')).toBeInTheDocument();
  });

  it('should show call the confirm and edit call on click of respective buttons', () => {
    const onAddressConfirmation = sinon.spy();
    const handleEditAddressClick = sinon.spy();
    render(
      <AddressButtonStrip
        isDeliveringHere={false}
        id={123}
        onAddressConfirmation={onAddressConfirmation}
        handleEditAddressClick={handleEditAddressClick}
        handleDeleteAddressClick={() => {}}
      />
    );

    userEvent.click(screen.queryByText(Strings.DELIVER_HERE));
    expect(onAddressConfirmation.calledOnce).toBe(true);

    userEvent.click(screen.queryByText(Strings.EDIT));
    expect(handleEditAddressClick.calledOnce).toBe(true);
  });

  it('should ask for confirmation if the user clicks on the delete button', async () => {
    render(
      <AddressButtonStrip
        isDeliveringHere={false}
        id={123}
        onAddressConfirmation={() => {}}
        handleEditAddressClick={() => {}}
        handleDeleteAddressClick={() => {}}
      />
    );

    userEvent.click(screen.getByRole('deleteIcon'));

    await new Promise(r => setTimeout(r, 500));
    expect(screen.queryByText(Strings.CANCEL)).toBeInTheDocument();
    expect(screen.queryByText(Strings.REMOVE_CONFIRMATION)).toBeInTheDocument();
  });

  it('clicking on the cancel should show the original button', async () => {
    /*********************************************************************
     * All the elements will be present in the doc, because the css will  *
     * not be rendered in the testing dom                                 *
     **********************************************************************/
    render(
      <AddressButtonStrip
        isDeliveringHere={false}
        id={123}
        onAddressConfirmation={() => {}}
        handleEditAddressClick={() => {}}
        handleDeleteAddressClick={() => {}}
      />
    );

    userEvent.click(screen.getByRole('deleteIcon'));
    expect(screen.queryByText(Strings.CANCEL)).toBeInTheDocument();
    expect(screen.queryByText(Strings.REMOVE_CONFIRMATION)).toBeInTheDocument();

    userEvent.click(screen.getByText(Strings.CANCEL));

    expect(screen.queryByText(Strings.DELIVER_HERE)).toBeInTheDocument();
    expect(screen.queryByText(Strings.EDIT)).toBeInTheDocument();
    expect(screen.getByRole('deleteIcon')).toBeInTheDocument();
  });

  it('clicking on the delete should show call the handleDeleteAddressClick', () => {
    const handleDeleteAddressClick = sinon.spy();
    render(
      <AddressButtonStrip
        isDeliveringHere={false}
        id={123}
        onAddressConfirmation={() => {}}
        handleEditAddressClick={() => {}}
        handleDeleteAddressClick={handleDeleteAddressClick}
      />
    );

    userEvent.click(screen.getByRole('deleteIcon'));
    expect(screen.queryByText(Strings.CANCEL)).toBeInTheDocument();
    expect(screen.queryByText(Strings.REMOVE_CONFIRMATION)).toBeInTheDocument();

    userEvent.click(screen.queryByText(Strings.REMOVE_CONFIRMATION));
    expect(handleDeleteAddressClick.calledOnce).toBe(true);
  });
});
