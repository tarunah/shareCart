import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SizeDialog, QtyDialog } from './';

import { productListWithOffer } from 'testUtils/cartMockData';

describe('Size dialogue', () => {
  it('should display selected seller price info, SizeSelector,moreSeller', () => {
    const product = productListWithOffer.productList1[0];
    const wrapper = mount(
      <Router>
        <SizeDialog {...product} show={true} />
      </Router>
    );

    expect(wrapper.find('SellerPriceComponent Amount').text()).toEqual('68');
    expect(wrapper.find('SellerPriceComponent StrikedAmount').text()).toEqual(
      '1,295'
    );
    expect(wrapper.find('SellerPriceComponent .discountText').text()).toEqual(
      '50% OFF'
    );
    expect(wrapper.find('SizeSelector').exists()).toEqual(true);
    expect(wrapper.find('MoreSellerMobile').text()).toEqual(
      '1 more seller available from 6'
    );
  });

  it('should call changeSizeAndSeller when size or seller is changed', () => {
    const product = productListWithOffer.productList1[0];
    const changeSizeAndSeller = jest.fn();

    render(
      <Router>
        <SizeDialog
          {...product}
          show={true}
          changeSizeAndSeller={changeSizeAndSeller}
        />
      </Router>
    );

    //select different size
    userEvent.click(screen.getByTestId('sizelabel-15197129'));
    userEvent.click(screen.getByRole('button'));
    expect(changeSizeAndSeller).toHaveBeenCalledTimes(1);
  });

  it('should not call changeSizeAndSeller when size not changed', () => {
    const product = productListWithOffer.productList1[0];
    const changeSizeAndSeller = jest.fn();
    render(
      <Router>
        <SizeDialog
          {...product}
          show={true}
          changeSizeAndSeller={changeSizeAndSeller}
        />
      </Router>
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
    expect(wrapper.find('.list').exists()).toBe(true);
  });
});
