import React from 'react';
import get from 'lodash/get';
import Styles from './accordianComponents.base.css';
import ChevronUp from 'iconComp/ChevronUp.jsx';
import ChevronDown from 'iconComp/ChevronDown.jsx';

const TabHeader = ({
  child,
  selectedTabBlock,
  switchTab,
  onTabClick,
  setTabRef,
  isOrderReview = false
}) => (
  <div
    id={child.props.id}
    className={isOrderReview ? Styles.tabOrderReview : Styles.tab}
    ref={setTabRef}
    onClick={e => {
      if (child.props.disabled) {
        return;
      }
      switchTab(e, '', { scrollTabIntoView: true });
      isOrderReview
        ? selectedTabBlock
          ? onTabClick('close')
          : onTabClick('open')
        : onTabClick(e);
    }}
  >
    {!child.props.disabled ? (
      <div>
        <span className={Styles.tabLabel}>
          {typeof child.props.display === 'function'
            ? child.props.display()
            : child.props.display}
        </span>
        {selectedTabBlock ? (
          <ChevronUp
            className={isOrderReview ? Styles.iconOrderReview : Styles.icon}
          />
        ) : (
          <ChevronDown
            className={isOrderReview ? Styles.iconOrderReview : Styles.icon}
          />
        )}
      </div>
    ) : (
      <div>
        <div className={Styles.disabledTabLabel}>
          {typeof child.props.display === 'function'
            ? child.props.display()
            : child.props.display}
        </div>
        {child.props.disabledContent}
      </div>
    )}
  </div>
);

const Content = ({ selectedTabBlock, child, isOrderReview }) =>
  selectedTabBlock ? (
    <div className={isOrderReview ? Styles.contentOrderReview : Styles.content}>
      {child.props.content}
    </div>
  ) : null;

const TabBlock = props => (
  <div
    className={`${Styles.tabBlock} ${
      props.selectedTabBlock && !props.isOrderReview
        ? Styles.selectedTabBlock
        : ''
    }`}
  >
    <TabHeader {...props} setTabRef={props.setTabRef} />
    <Content {...props} />
  </div>
);

export const AccordianComponent = ({
  className,
  selected,
  children,
  switchTab,
  onTabClick,
  setRef,
  setTabRef,
  isOrderReview
}) => (
  <div className={className} ref={setRef}>
    {React.Children.map(children, child => {
      const selectedTabBlock = child.props.id === selected;
      return child.props.show ? (
        <TabBlock
          child={child}
          isOrderReview={isOrderReview}
          selectedTabBlock={selectedTabBlock}
          switchTab={switchTab}
          onTabClick={onTabClick}
          setTabRef={setTabRef}
        />
      ) : null;
    })}
  </div>
);
