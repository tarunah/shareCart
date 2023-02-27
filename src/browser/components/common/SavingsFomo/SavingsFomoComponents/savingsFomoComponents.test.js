import React from 'react';
import { mount } from 'enzyme';
import { SavingsFomoHeader } from './';
import Strings from 'commonBrowserUtils/Strings';

const { MIGHT_MISS_SAVINGS, LEAVE_PAGE_CONFIRMATION } = Strings;

describe('Savings Fomo', () => {
  it('should render savings fomo header', () => {
    const wrapper = mount(<SavingsFomoHeader totalSavings={123} />);
    expect(wrapper.find('.header').text()).toBe(MIGHT_MISS_SAVINGS);
    expect(wrapper.find('.savingsValue').text()).toBe('₹123');
    expect(wrapper.find('.savingsConfirmationText').text()).toBe(
      LEAVE_PAGE_CONFIRMATION
    );
  });
});
