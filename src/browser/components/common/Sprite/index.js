import PropTypes from 'prop-types';
import React from 'react';

class Sprite extends React.PureComponent {
  render() {
    const { props } = this;
    return (
      <div
        style={props.style || {}}
        className={`sprite-${props.name} ${props.className || ''}`}
        onClick={props.onClick}
      />
    );
  }
}

Sprite.propTypes = {
  name: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Sprite;
