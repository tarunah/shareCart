import React from 'react';
import PropTypes from 'prop-types';

class OptionsContainer extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.render()}</div>;
  }
}

OptionsContainer.propTypes = {
  render: PropTypes.func
};

export default OptionsContainer;
