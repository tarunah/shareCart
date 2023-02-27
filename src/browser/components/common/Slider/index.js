import React from 'react';
import PropTypes from 'prop-types';

import Styles from './slider.base.css';

export const Slide = props => {
  const { slideToLeft, slideToRight, render } = props || {};
  return <div> {render(slideToLeft, slideToRight)} </div>;
};

Slide.propsTypes = {
  slideToLeft: PropTypes.func,
  slideToRight: PropTypes.func,
  render: PropTypes.func
};

Slide.defaultProps = {
  slideToLeft: () => {},
  slideToRight: () => {},
  render: () => {}
};

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlideIndex: 0
    };

    ['slideToLeft', 'slideToRight'].forEach(
      method => (this[method] = this[method].bind(this))
    );

    this.slidesCount = React.Children.count(props.children);
    this.renderedSlidesCount = 1;
  }

  slideToLeft() {
    const { activeSlideIndex } = this.state;
    if (activeSlideIndex === this.slidesCount - 1) return;
    this.renderedSlidesCount = Math.min(
      this.renderedSlidesCount + 1,
      this.slidesCount
    );
    this.setState({ activeSlideIndex: activeSlideIndex + 1 });
  }

  slideToRight() {
    const { activeSlideIndex } = this.state;
    if (activeSlideIndex === 0) return;
    this.setState({ activeSlideIndex: activeSlideIndex - 1 });
  }

  render() {
    const { activeSlideIndex } = this.state;
    return (
      <div>
        {React.Children.map(this.props.children, (child, index) => {
          if (index + 1 > this.renderedSlidesCount) {
            return null;
          }

          let className = Styles.viewRight;
          if (index < activeSlideIndex) className = Styles.viewLeft;
          if (index === activeSlideIndex) className = Styles.view;

          return (
            <div className={className}>
              {React.cloneElement(child, {
                slideToLeft: this.slideToLeft,
                slideToRight: this.slideToRight
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Slider;

Slider.propTypes = {
  children: PropTypes.node
};
