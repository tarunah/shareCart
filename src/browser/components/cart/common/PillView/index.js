import React from 'react';
import Styles from './pills.base.css';

const Pill = props => {
  const { pill, currentArticle, onPillClick } = props;

  return (
    <div
      className={`${Styles.pill} ${
        pill === currentArticle ? Styles.activePill : Styles.normalPill
      }`}
      id={`cart-filler-pill-${pill}`}
      data-key={pill}
      onClick={onPillClick}
    >
      <div className={Styles.textStyle}>{pill}</div>
    </div>
  );
};

export const PillView = React.memo(props => {
  const { articleList, mode, ...restProps } = props;
  return (
    <div
      className={`${Styles.pillsContainer} ${
        mode === 'mobile'
          ? Styles.pillsMobileContainer
          : Styles.pillsDesktopContainer
      }`}
    >
      {articleList &&
        articleList.map(pillName => <Pill pill={pillName} {...restProps} />)}
    </div>
  );
});
