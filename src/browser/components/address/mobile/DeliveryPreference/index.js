import React from 'react';
import PropTypes from 'prop-types';

// Components
import ToolTip from 'commonComp/ToolTip';

// Styles
import Style from './deliveryPreference.base.css';

import Info from 'iconComp/Info.jsx';
import RadioActive from 'iconComp/RadioActive.jsx';
import RadioInactive from 'iconComp/RadioInactive.jsx';

const GROUP_SHIPMENTS_KEY = 'group_shipments';
const SPEED_SHIPMENTS_KEY = 'speed_shipments';

export const DeliveryPreference = props => {
  const { selectDeliveryPreference, selectedDeliveryPreference } = props;
  return props.show ? (
    <div className={Style.deliveryPreferenceContainer}>
      <div className={Style.deliveryPreferenceTitle}>
        Choose delivery preference
        <ToolTip
          className={Style.toolTipText}
          elem={<Info className={Style.tooltipInfoIcon} />}
        >
          We will try our best to match your preferences
        </ToolTip>
      </div>
      <div className={Style.deliveryPreferenceOptions}>
        <ShipmentBlock
          dataMethod={GROUP_SHIPMENTS_KEY}
          selected={selectedDeliveryPreference === GROUP_SHIPMENTS_KEY}
          message="Group items into as few shipments as possible"
          selectDeliveryPreference={selectDeliveryPreference}
        />
        <ShipmentBlock
          dataMethod={SPEED_SHIPMENTS_KEY}
          selected={selectedDeliveryPreference === SPEED_SHIPMENTS_KEY}
          message="Ship my items as soon as they become available"
          selectDeliveryPreference={selectDeliveryPreference}
        />
      </div>
    </div>
  ) : null;
};

DeliveryPreference.propTypes = {
  show: PropTypes.bool.isRequired,
  selectDeliveryPreference: PropTypes.func.isRequired,
  selectedDeliveryPreference: PropTypes.string.isRequired
};

class ShipmentBlock extends React.Component {
  constructor(props) {
    super(props);
    this.selectDeliveryPreference = props.selectDeliveryPreference.bind(
      null,
      props.dataMethod
    );
  }
  render() {
    const { selected, message } = this.props;
    return (
      <div
        className={Style.preferenceOption}
        onClick={this.selectDeliveryPreference}
      >
        {selected ? (
          <RadioActive className={Style.selectedRadioIcon} />
        ) : (
          <RadioInactive className={Style.radioIcon} />
        )}
        <div className={Style.preferenceOptionMessage}>{message}</div>
      </div>
    );
  }
}

ShipmentBlock.propTypes = {
  selected: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  dataMethod: PropTypes.string.isRequired,
  selectDeliveryPreference: PropTypes.func.isRequired
};

export default DeliveryPreference;
