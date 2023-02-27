import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SizeSelector from './';
import { productListWithOffer } from 'testUtils/cartMockData';
import { getSizesList } from 'commonBrowserUtils/CartHelper';

describe('SizeSelector', () => {
  it('should display a header, sizeLabels, seller, a cta, renderMoreSeller should be called once ', () => {
    const productWithDifferentSellerPrice =
      productListWithOffer.productList1[0];
    productWithDifferentSellerPrice.selectedSkuId =
      productWithDifferentSellerPrice.skuId;
    const list = getSizesList(productWithDifferentSellerPrice.sizes);
    const spy = sinon.spy(() => {});
    const wrapper = mount(
      <SizeSelector
        {...productWithDifferentSellerPrice}
        list={list}
        deviceMode={'mobile'}
        renderMoreSeller={spy}
        onDone={() => {}}
        header="Select Size"
        selectedPartnerId={500}
      />
    );

    expect(wrapper.find('.header').text()).toEqual('Select Size');
    expect(wrapper.find('SizeLabel').length).toEqual(2);
    expect(wrapper.find('Seller').text()).toEqual('Seller: RetailNet');
    expect(wrapper.find('Button').exists()).toBe(true);
    expect(spy.calledOnce).toBe(true);
  });

  it('should call onDone when button is clicked, with the selectedSize', () => {
    const productWithDifferentSellerPrice =
      productListWithOffer.productList1[0];
    productWithDifferentSellerPrice.selectedSkuId =
      productWithDifferentSellerPrice.skuId;
    const list = getSizesList(productWithDifferentSellerPrice.sizes);
    const spy = jest.fn();
    render(
      <SizeSelector
        {...productWithDifferentSellerPrice}
        list={list}
        deviceMode={'mobile'}
        renderMoreSeller={() => {}}
        onDone={spy}
        header="Select Size"
        selectedPartnerId={500}
      />
    );

    userEvent.click(screen.getByRole('button'));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should display only sizeLabel if the price is same', () => {
    const productWithSameSellerPrice = productListWithOffer.productList2[0];
    productWithSameSellerPrice.selectedSkuId = productWithSameSellerPrice.skuId;
    const list = getSizesList(productWithSameSellerPrice.sizes);
    const wrapper = mount(
      <SizeSelector
        {...productWithSameSellerPrice}
        list={list}
        deviceMode={'mobile'}
        renderMoreSeller={() => {}}
        onDone={() => {}}
        selectedPartnerId={500}
      />
    );

    expect(
      wrapper
        .find('SizeLabel')
        .first()
        .text()
    ).toBe('S');
  });

  it('should display sizeLabel with the price if BuyButtonWinner sellers differ in price', () => {
    const productWithDifferentSellerPrice =
      productListWithOffer.productList1[0];
    productWithDifferentSellerPrice.selectedSkuId =
      productWithDifferentSellerPrice.skuId;
    const list = getSizesList(productWithDifferentSellerPrice.sizes);
    const wrapper = mount(
      <SizeSelector
        {...productWithDifferentSellerPrice}
        list={list}
        deviceMode={'mobile'}
        renderMoreSeller={() => {}}
        onDone={() => {}}
        selectedPartnerId={500}
      />
    );

    expect(
      wrapper
        .find('SizeLabel')
        .first()
        .text()
    ).toContain('S');
    expect(
      wrapper
        .find('SizeLabel')
        .first()
        .text()
    ).toContain('68');
  });

  it('should not display price in priceBubble but should show more sellers available when the price is different across sellers and buy button winner is same', () => {
    const productWithSameSellerPrice = productListWithOffer.productList2[0];
    productWithSameSellerPrice.selectedSkuId = productWithSameSellerPrice.skuId;
    productWithSameSellerPrice.sizes[0].sellers[1].price.subTotal = 30;
    const list = getSizesList(productWithSameSellerPrice.sizes);
    const spy = sinon.spy(() => {});
    const wrapper = mount(
      <SizeSelector
        {...productWithSameSellerPrice}
        list={list}
        deviceMode={'mobile'}
        renderMoreSeller={spy}
        onDone={() => {}}
        selectedPartnerId={500}
      />
    );

    expect(
      wrapper
        .find('SizeLabel')
        .first()
        .text()
    ).toBe('S');
    expect(wrapper.find('SellerPriceComponent').exists()).toBe(true);
    expect(spy.calledOnce).toBe(true);
  });

  describe('Mobile', () => {
    it('should display sizeSelector with InlinePrice when price is different', () => {
      const productWithDifferentSellerPrice =
        productListWithOffer.productList1[0];
      productWithDifferentSellerPrice.selectedSkuId =
        productWithDifferentSellerPrice.skuId;
      const list = getSizesList(productWithDifferentSellerPrice.sizes);
      const wrapper = mount(
        <SizeSelector
          {...productWithDifferentSellerPrice}
          list={list}
          deviceMode={'mobile'}
          renderMoreSeller={() => {}}
          onDone={() => {}}
          selectedPartnerId={500}
        />
      );
      expect(wrapper.find('SellerPriceComponent').exists()).toBe(true);
    });

    it('should not display sizeSelector with InlinePrice when price is same', () => {
      const productWithSameSellerPrice = productListWithOffer.productList2[0];
      productWithSameSellerPrice.selectedSkuId =
        productWithSameSellerPrice.skuId;
      const list = getSizesList(productWithSameSellerPrice.sizes);
      const wrapper = mount(
        <SizeSelector
          {...productWithSameSellerPrice}
          list={list}
          deviceMode={'mobile'}
          renderMoreSeller={() => {}}
          onDone={() => {}}
          selectedPartnerId={500}
        />
      );

      expect(wrapper.find('InlinePriceComponent').exists()).toBe(false);
    });
  });
});
