import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { scrollIntoView } from 'commonBrowserUtils/Helper';
import { isVariantEnabled } from 'commonUtils/FeaturesManager';
import { getKVPairValue } from 'commonUtils/KVPairManager';

import Styles from './tabBar.base.css';
import ChevronLeft from 'iconComp/ChevronLeft.jsx';

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

const getSelectedTab = props => {
  let selected = '';
  props.defaultSelect &&
    React.Children.forEach(props.children, child => {
      child.props.show &&
        !child.props.disabled &&
        !selected &&
        (selected = child.props.id);
    });
  return selected;
};

class TabBar extends React.Component {
  constructor(props) {
    super(props);
    this.isPaymentOptionReorderV2Variant2Enabled = isVariantEnabled(
      'PAYMENT_OPTION_REORDERV2_VARIANT2'
    );
    this.preSelectedOption =
      get(getKVPairValue('PAYMENT_OPTIONS'), 'preSelectedOptionV2') || 'upi';
    this.state = {
      selected: this.isPaymentOptionReorderV2Variant2Enabled
        ? this.preSelectedOption
        : getSelectedTab(props)
    };

    ['switchTab', 'goBack', 'getSelected', 'setMobileRef'].forEach(
      method => (this[method] = this[method].bind(this))
    );
  }

  static getDerivedStateFromProps(props, state) {
    if (!selectedTabExists(state.selected, props)) {
      return {
        selected: getSelectedTab(props)
      };
    }
    return null;
  }

  switchTab(e, tabId = '', options = {}) {
    const id = get(e, 'currentTarget.id', tabId);
    if (id === this.state.selected) {
      options.callback && options.callback();
      return;
    }

    if (options.scrollIntoView && id) {
      scrollIntoView(this.tabBarMobile, {
        behavior: 'smooth',
        block: 'center'
      });
    }

    this.setState(
      {
        selected: id
      },
      () => {
        options.callback && options.callback();
      }
    );
    this.props.onSwitchTab(id);
  }

  selectDefaultTab() {
    this.switchTab('', getSelectedTab(this.props));
  }

  goBack() {
    this.props.closeTab();
    this.setState({
      selected: ''
    });
  }

  getSelected() {
    return this.state.selected;
  }

  setMobileRef(node) {
    this.tabBarMobile = node;
  }

  getTabBarDesktop() {
    const {
      props: { children, className = '', onTabClick, tabClass = '' },
      state: { selected }
    } = this;
    let selectedChild;

    return (
      <div className={`${Styles.tabBar} ${className}`}>
        <div className={Styles.tabsBlock}>
          {React.Children.map(children, child => {
            const isChildSelected = child.props.id === selected;
            isChildSelected && (selectedChild = child);
            return child.props.show ? (
              <div
                id={child.props.id}
                className={`${isChildSelected ? Styles.selected : ''} ${
                  Styles.tab
                } ${tabClass}`}
                onClick={e => {
                  if (child.props.disabled) {
                    return;
                  }
                  this.switchTab(e);
                  onTabClick(e);
                }}
              >
                {!child.props.disabled ? (
                  <span className={Styles.tabLabel}>
                    {typeof child.props.display === 'function'
                      ? child.props.display(isChildSelected)
                      : child.props.display}
                  </span>
                ) : (
                  <div>
                    <div className={Styles.disabledTabLabel}>
                      {typeof child.props.display === 'function'
                        ? child.props.display(isChildSelected)
                        : child.props.display}
                    </div>
                    <div>{child.props.disabledContent}</div>
                  </div>
                )}
              </div>
            ) : null;
          })}
        </div>
        <div className={Styles.contentBlock}>{selectedChild.props.content}</div>
      </div>
    );
  }

  getTabBarMobile() {
    const {
      props: { children, className = '', onTabClick },
      state: { selected },
      setMobileRef
    } = this;
    let selectedChild;

    selected &&
      React.Children.forEach(
        children,
        child => child.props.id === selected && (selectedChild = child)
      );

    return (
      <div className={className} ref={setMobileRef}>
        {selected ? (
          <div>
            <div className={Styles.goBack} onClick={this.goBack}>
              <ChevronLeft className={Styles.backIcon} />
              {'Go Back'}
            </div>
            <div className={Styles.contentBlockMobile}>
              {selectedChild.props.content}
            </div>
          </div>
        ) : (
          <div className={Styles.tabsBlockMobile}>
            {React.Children.map(children, child => {
              return child.props.show ? (
                <div
                  id={child.props.id}
                  className={`${Styles.tabMobile}`}
                  onClick={e => {
                    if (child.props.disabled) {
                      return;
                    }
                    this.switchTab(e, '', { scrollIntoView: true });
                    onTabClick(e);
                  }}
                >
                  {!child.props.disabled ? (
                    <div>
                      <span className={Styles.tabLabel}>
                        {child.props.display}
                      </span>
                      <span className={Styles.select}>SELECT</span>
                    </div>
                  ) : (
                    <div>
                      <div className={Styles.disabledTabLabel}>
                        {child.props.display}
                      </div>
                      {child.props.disabledContent}
                    </div>
                  )}
                </div>
              ) : null;
            })}
          </div>
        )}
      </div>
    );
  }

  render() {
    const {
      props: { mode }
    } = this;
    return mode === 'desktop'
      ? this.getTabBarDesktop()
      : this.getTabBarMobile();
  }
}

export const Tab = () => <div />;

TabBar.propTypes = {
  defaultSelect: PropTypes.bool,
  selected: PropTypes.string,
  mode: PropTypes.string,
  onTabClick: PropTypes.func,
  closeTab: PropTypes.func,
  onSwitchTab: PropTypes.func
};

TabBar.defaultProps = {
  onTabClick: () => {},
  closeTab: () => {},
  onSwitchTab: () => {}
};

Tab.propTypes = {
  id: PropTypes.string,
  display: PropTypes.string,
  content: PropTypes.Component
};

export default TabBar;
