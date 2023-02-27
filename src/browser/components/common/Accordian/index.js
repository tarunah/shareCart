import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import {
  scrollIntoView,
  scrollBy,
  isPWA,
  getUidx
} from 'commonBrowserUtils/Helper';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import {
  isFeatureEnabled,
  isVariantEnabled
} from 'commonUtils/FeaturesManager';

import { AccordianComponent } from './accordianComponents';

const PAGE_HEADER_HEIGHT = 60;
const TAB_HEIGHT = 64;
const TAB_MARGIN = 8;

const selectedTabExists = (selectedTab, props) => {
  let exists = false;
  React.Children.forEach(props.children, child => {
    child.props.show &&
      !child.props.disabled &&
      !exists &&
      (exists = selectedTab === child.props.id);
  });
  return exists;
};

const getDefaultTabToSelect = props => {
  let selected = null;
  props.defaultSelect &&
    React.Children.forEach(props.children, child => {
      child.props.show &&
        !child.props.disabled &&
        !selected &&
        (selected = child.props.id);
    });
  return selected;
};

class Accordian extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: null };

    this.firstUpdate = false;

    ['switchTab', 'getSelected', 'setRef', 'setTabRef'].forEach(
      method => (this[method] = this[method].bind(this))
    );
  }

  componentDidUpdate() {
    if (!this.firstUpdate) {
      const isPaymentOptionReorderEnabled = isFeatureEnabled(
        'PAYMENT_OPTION_REORDER'
      );
      const isPaymentOptionReorderV2Variant2Enabled = isVariantEnabled(
        'PAYMENT_OPTION_REORDERV2_VARIANT2'
      );
      const isFirstTimeCustomer = get(this.props, 'isFirstTimeCustomer', false);
      if (isPaymentOptionReorderEnabled && isFirstTimeCustomer) {
        const preSelectedOption =
          get(getKVPairValue('PAYMENT_OPTIONS'), 'preSelectedOption') || 'upi';
        this.setState({
          selected: preSelectedOption
        });
      } else if (isPaymentOptionReorderV2Variant2Enabled) {
        const preSelectedOption =
          get(getKVPairValue('PAYMENT_OPTIONS'), 'preSelectedOptionV2') ||
          'upi';
        this.setState({
          selected: preSelectedOption
        });
      }
      this.firstUpdate = true;
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (!selectedTabExists(state.selected, props)) {
      return {
        selected: getDefaultTabToSelect(props)
      };
    }
    return null;
  }

  switchTab(e, tabId = '', options = {}) {
    const id = get(e, 'currentTarget.id', tabId);
    const shouldTabClose = this.state.selected === id && !options.keepTabOpen;
    if (id) {
      triggerEvent('PAYMENT_TAB_TOGGLE_CLICK', {
        custom: {
          custom: {
            v1: getUidx(),
            v2: shouldTabClose ? 'close' : 'open'
          },
          widget: {
            name: 'payment_option',
            type: 'list',
            data_set: {
              data: {
                entity_optional_attribute: get(
                  this.props,
                  'children.0.props.content.props.totalPayable',
                  0
                )
              }
            }
          },
          widget_items: {
            name: id,
            type: 'list-item'
          }
        }
      });
    }

    if (options.scrollIntoView && id) {
      this.accordian &&
        scrollIntoView(this.accordian, {
          behavior: 'smooth',
          block: 'center'
        });
    }

    shouldTabClose && this.props.closeTab();
    this.setState(
      {
        selected: shouldTabClose ? null : id
      },
      () => {
        options.callback && options.callback();
        if (options.scrollTabIntoView && id && !shouldTabClose) {
          const headerOffset =
            TAB_HEIGHT + TAB_MARGIN + (isPWA() ? PAGE_HEADER_HEIGHT : 0);
          this[id] &&
            scrollBy({
              top: this[id].offsetTop - window.pageYOffset - headerOffset,
              behavior: 'smooth'
            });
        }
      }
    );
    this.props.onSwitchTab(id);
  }

  selectDefaultTab() {
    this.switchTab(null, getDefaultTabToSelect(this.props));
  }

  getSelected() {
    return this.state.selected;
  }

  setRef(node) {
    this.accordian = node;
  }

  setTabRef(node) {
    node && (this[node.id] = node);
  }

  render() {
    const { props, state, switchTab, setRef, setTabRef } = this;

    return (
      <AccordianComponent
        {...props}
        {...state}
        switchTab={switchTab}
        setRef={setRef}
        setTabRef={setTabRef}
      />
    );
  }
}

export const Tab = () => <div />;

Accordian.propTypes = {
  selected: PropTypes.string,
  className: PropTypes.string,
  onTabClick: PropTypes.func,
  closeTab: PropTypes.func
};

Accordian.defaultProps = {
  closeTab: () => {}
};

Tab.propTypes = {
  id: PropTypes.string,
  display: PropTypes.string,
  content: PropTypes.Component
};

export default Accordian;
