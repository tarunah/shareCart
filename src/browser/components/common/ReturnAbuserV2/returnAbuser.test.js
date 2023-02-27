import React from 'react';
import { mount, shallow } from 'enzyme';
import ReturnAbuser from '.';

describe('return abuser Component', () => {
  it('should not render - logged in and is not return abuser', () => {
    const userDetails = {
      returnAbuser: {
        level: 'DEFAULT'
      },
      cod: {
        maxCod: 100
      }
    };
    document.cookie = 'ilgim=true';
    const wrapper = shallow(<ReturnAbuser {...userDetails} />);
    expect(wrapper.type()).toEqual(null);
  });

  it('should not render - logged out user or first time user', () => {
    const userDetails = {
      returnAbuser: {
        level: 'DEFAULT'
      },
      cod: {
        maxCod: 0
      }
    };
    document.cookie = 'ilgim=false';
    const wrapper = shallow(<ReturnAbuser {...userDetails} />);
    expect(wrapper.type()).toEqual(null);
  });

  it('should render with an info with No Free Delivery', () => {
    const userDetails = {
      returnAbuser: {
        level: 'LOW'
      },
      cod: {
        maxCod: 100
      }
    };
    document.cookie = 'ilgim=true';

    const wrapper = mount(<ReturnAbuser {...userDetails} />);
    expect(wrapper.exists()).toBe(true);
    wrapper.find('.link').simulate('click', { stopPropagation() {} });
    expect(wrapper.find('.header').text()).toMatch(
      'Why Convenience fee is applicable for this order?'
    );
    expect(wrapper.find('.info').length).toBe(1);
    expect(wrapper.find('Modal').props().cancelIconConfig.show).toBe(true);
  });

  it('should render with both no free Delivery & no cod', () => {
    const userDetails = {
      returnAbuser: {
        level: 'LOW'
      },
      cod: {
        maxCod: 0
      }
    };
    document.cookie = 'ilgim=true';

    const wrapper = mount(<ReturnAbuser {...userDetails} />);
    expect(wrapper.exists()).toBe(true);
    wrapper.find('.link').simulate('click', { stopPropagation() {} });
    expect(wrapper.find('.header').text()).toMatch(
      'Why Convenience fee is applicable & Pay on Delivery is not available?'
    );
  });

  it('should render with no cod', () => {
    const userDetails = {
      returnAbuser: {
        level: 'DEFAULT'
      },
      cod: {
        maxCod: 0
      }
    };
    const shippingCharge = 0;
    document.cookie = 'ilgim=true';

    const wrapper = mount(
      <ReturnAbuser {...{ ...userDetails, shippingCharge }} />
    );
    expect(wrapper.exists()).toBe(true);
    wrapper.find('.link').simulate('click', { stopPropagation() {} });
    expect(wrapper.find('.header').text()).toMatch(
      'Why is Pay on Delivery not available?'
    );
  });
});
