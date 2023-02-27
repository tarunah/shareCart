import React from 'react';
import get from 'lodash/get';

import { setDocTitleInMobile } from 'commonBrowserUtils/Helper';
import {
  isFeatureEnabled,
  isVariantEnabled
} from 'commonUtils/FeaturesManager';

import Loader from 'commonComp/Loader';

import AddressForm from '../../common/AddressForm';
import { withRouter } from 'react-router';

export class AddressFormPage extends React.Component {
  constructor(props) {
    super(props);
    this.successCallback = this.successCallback.bind(this);
  }

  componentDidMount() {
    if (this.props.addressInfo && this.props.addressInfo.id) {
      setDocTitleInMobile('EDIT ADDRESS');
    } else {
      setDocTitleInMobile('ADD NEW ADDRESS');
    }
    this.props.setToContainerState({ action: 'back' });
  }
  /* If not navigating to Add/EditAddress from List page using initiatedFromAddressMain state prop to call goBack once,
  else work with normal flow(Address -> List page -> Edit/Add) and goBack twice.*/
  successCallback() {
    const { location } = this.props;
    let initiatedFromAddressMain =
      location && location.state
        ? get(location, 'state.initiatedFromAddressMain')
        : false;
    this.props.setToContainerState({ action: '' }, () => {
      if (
        initiatedFromAddressMain ||
        isVariantEnabled('AOC_V2_VARIANT3') ||
        isFeatureEnabled('ORDER_REVIEW')
      ) {
        this.props.goBack(-1);
      } else {
        this.props.goBack(-2);
      }
    });
  }

  render() {
    const { addressInfo, loading, handleAddressAction, cartData } = this.props;
    const isNewUser = get(cartData, 'userDetails.isFirstTimeCustomer', false);
    return (
      <div>
        <Loader show={loading} backdrop={true} />
        <AddressForm
          isNewUser={isNewUser}
          successCallback={this.successCallback}
          addressInfo={addressInfo}
          handleAddressAction={handleAddressAction}
          mode="mobile"
        />
      </div>
    );
  }
}

export default withRouter(AddressFormPage);
