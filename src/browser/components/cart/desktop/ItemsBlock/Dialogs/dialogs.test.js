import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SizeDialog, QtyDialog } from './';

import { productListWithOffer } from 'testUtils/cartMockData';

describe('Size dialogue', () => {
  it('should display product info, SizeSelector,moreSeller', () => {
    const product = productListWithOffer.productList1[0];
    const wrapper = mount(<SizeDialog {...product} show={true} />);

    const selectedProductDisplay = wrapper.find('SelectedProductDisplay');
    expect(selectedProductDisplay.find('Image').exists()).toBe(true);
    expect(selectedProductDisplay.find('.brandName').text()).toEqual(' Nike ');
    expect(selectedProductDisplay.find('.productName').text()).toEqual(
      ' Men Blue Printed AS M NK BRT SS DRY GFX T-shirt '
    );
    expect(selectedProductDisplay.find('Amount .bold').text()).toEqual('5,615');
    expect(selectedProductDisplay.find('StrikedAmount .price').text()).toEqual(
      '8,380'
    );
    expect(wrapper.find('SizeSelector').exists()).toEqual(true);
    expect(wrapper.find('MoreSellerDesktop').text()).toEqual(
      '1 more seller available from 6'
    );
  });

  it('should call changeSizeAndSeller when size  is changed', () => {
    const product = productListWithOffer.productList1[0];
    const changeSizeAndSeller = jest.fn();
    render(
      <SizeDialog
        {...product}
        show={true}
        changeSizeAndSeller={changeSizeAndSeller}
      />
    );

    //select different size
    userEvent.click(screen.getByTestId('sizelabel-15197129'));
    userEvent.click(screen.getByRole('button'));
    expect(changeSizeAndSeller).toHaveBeenCalledTimes(1);
  });

  it('should call changeSizeAndSeller when seller is changed', () => {
    const product = productListWithOffer.productList1[0];
    const changeSizeAndSeller = jest.fn();
    render(
      <SizeDialog
        {...product}
        show={true}
        changeSizeAndSeller={changeSizeAndSeller}
      />
    );

    //select different Seller
    userEvent.click(screen.getByTestId('more-sellers'));
    userEvent.click(screen.getByTestId('sellerinfo-501'));
    userEvent.click(screen.getByRole('button'));

    expect(changeSizeAndSeller).toHaveBeenCalledTimes(1);
  });

  it('should not call changeSizeAndSeller when size or seller is not changed', () => {
    const product = productListWithOffer.productList1[0];
    const changeSizeAndSeller = jest.fn();
    render(
      <SizeDialog
        {...product}
        show={true}
        changeSizeAndSeller={changeSizeAndSeller}
      />
    );

    userEvent.click(screen.getByRole('button'));
    expect(changeSizeAndSeller).toHaveBeenCalledTimes(0);
  });
});

describe('Quantity dialogue', () => {
  it('should render a modal with different quantity', () => {
    const product = productListWithOffer.productList1[0];
    const selectedSize = product.sizes[0];
    const wrapper = mount(
      <QtyDialog {...product} selectedSize={selectedSize} show={true} />
    );

    expect(wrapper.find('.header').text()).toEqual('Select Quantity');
    expect(wrapper.find('.qtyList').exists()).toBe(true);
  });
});
