import React from 'react';
import { mount, shallow } from 'enzyme';
import ShippingTip from '.';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import { noFreeShippingData, cartMockData } from 'testUtils/cartMockData';

const charges = [{ name: 'shipping', value: 150 }];

describe('shipping tip Component', () => {
  it('should not render to return abuser', () => {
    const userDetails = {
      returnAbuser: {
        level: 'LOW'
      }
    };

    const wrapper = shallow(<ShippingTip {...userDetails} />);
    expect(wrapper.find('.deliveryTip').length).toBe(0);
  });

  it('should not render if bag value more than 4500', () => {
    const userDetails = {
      returnAbuser: {
        level: 'DEFAULT'
      }
    };

    const wrapper = shallow(<ShippingTip {...userDetails} total={4501} />);
    expect(wrapper.find('.deliveryTip').length).toBe(0);
  });

  it('should render if bag value is more than 4500, new user propositions ab is enabled and it is a new user', () => {
    window._checkout_ = {
      __myx_deviceData__: {
        isApp: true
      },
      __myx_ab__: {
        'cart.newusers': 'enabled'
      }
    };
    const userDetails = {
      returnAbuser: {
        level: 'DEFAULT'
      },
      isFirstTimeCustomer: true
    };
    const shippingData = {
      meta: {
        minMore: ''
      }
    };

    const wrapper = mount(
      <ShippingTip
        {...userDetails}
        total={4501}
        shippingData={shippingData}
        charges={[]}
      />
    );
    expect(wrapper.exists()).toBe(true);
    expect(
      wrapper
        .find('.tipMessage')
        .text()
        .replace(/\s/g, '')
    ).toMatch('Yay!Noconveniencefeeonyourfirstorder.');
    expect(wrapper.find('.deliveryTip').length).toBe(1);
  });

  it('should not render if bag value is more than 4500, new user propositions ab is enabled but it is not a new user', () => {
    window._checkout_ = {
      __myx_deviceData__: {
        isApp: true
      },
      __myx_ab__: {
        'cart.newusers': 'enabled'
      }
    };
    const userDetails = {
      returnAbuser: {
        level: 'DEFAULT'
      },
      isFirstTimeCustomer: false
    };
    const shippingData = {
      meta: {
        minMore: ''
      }
    };

    const wrapper = mount(
      <ShippingTip
        {...userDetails}
        total={4501}
        shippingData={shippingData}
        charges={[]}
      />
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.deliveryTip').length).toBe(0);
  });

  it('should not render if bag value is more than 4500, it is not a new user but new user propositions ab is disabled', () => {
    window._checkout_ = {
      __myx_deviceData__: {
        isApp: true
      },
      __myx_ab__: {
        'cart.newusers': 'disabled'
      }
    };
    const userDetails = {
      returnAbuser: {
        level: 'DEFAULT'
      },
      isFirstTimeCustomer: true
    };
    const shippingData = {
      meta: {
        minMore: ''
      }
    };

    const wrapper = mount(
      <ShippingTip
        {...userDetails}
        total={4501}
        shippingData={shippingData}
        charges={[]}
      />
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.deliveryTip').length).toBe(0);
  });

  it('should render with an info free delivery to users', () => {
    window._checkout_ = {};
    const userDetails = {
      returnAbuser: {
        level: 'DEFAULT'
      }
    };

    const shippingData = {
      meta: {
        minMore: ''
      }
    };

    const wrapper = mount(
      <ShippingTip
        {...userDetails}
        total={4500}
        shippingData={shippingData}
        charges={[]}
      />
    );

    expect(wrapper.exists()).toBe(true);
    expect(
      wrapper
        .find('.tipMessage')
        .text()
        .replace(/\s/g, '')
    ).toMatch('Yay!Noconveniencefeeonthisorder.');
  });

  it('should render with an info to buy more', () => {
    const userDetails = {
      returnAbuser: {
        level: 'DEFAULT'
      }
    };
    document.cookie = 'ilgim=true';

    const meta = {
      minMore: 105,
      shippingLimit: 1199,
      categories: ''
    };

    const shippingData = {
      meta: meta
    };

    const wrapper = mount(
      <ShippingTip
        {...userDetails}
        total={4500}
        shippingData={shippingData}
        charges={charges}
      />
    );

    expect(wrapper.exists()).toBe(true);
    expect(
      wrapper
        .find('.tipMessage')
        .text()
        .replace(/\s/g, '')
    ).toMatch(
      'Shopfor' + shippingData.meta.minMore + 'moretoavoidconveniencefee.'
    );
  });

  it('should not render if shipping charges are present but no min more', () => {
    const userDetails = {
      returnAbuser: {
        level: 'DEFAULT'
      }
    };

    const shippingData = {
      meta: {
        minMore: ''
      }
    };

    const wrapper = mount(
      <ShippingTip
        {...userDetails}
        total={4500}
        shippingData={shippingData}
        charges={charges}
      />
    );

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.deliveryTip').length).toBe(0);
  });

  it('should render with special category specific delivery tip', () => {
    const userDetails = {
      returnAbuser: {
        level: 'DEFAULT'
      }
    };

    const shippingData = {
      meta: {
        minMore: 105,
        categories: 'Personal'
      }
    };
    document.cookie = 'ilgim=true';

    const wrapper = mount(
      <ShippingTip
        {...userDetails}
        total={4500}
        shippingData={shippingData}
        charges={charges}
      />
    );

    expect(wrapper.exists()).toBe(true);
    expect(
      wrapper
        .find('.tipMessage')
        .text()
        .replace(/\s/g, '')
    ).toMatch(
      'Shopfor' +
        shippingData.meta.minMore +
        'morefromPersonalcategorytoavoidconveniencefee.'
    );
  });
});
