import React from 'react';
import get from 'lodash/get';
import { setDocTitleInMobile } from 'commonBrowserUtils/Helper';
import Loader from 'commonComp/Loader';

import AddressForm from '../../../address/common/AddressForm';

class AddressFormPage extends React.Component {
  constructor(props) {
    super(props);
    this.successCallback = this.successCallback.bind(this);
  }

  componentDidMount() {
    setDocTitleInMobile(this.props.title);
  }

  successCallback() {
    const { goBack } = this.props;
    goBack && goBack(-1);
  }

  render() {
    const { loading, handleAddressAction, addressInfo } = this.props;
    const isNewUser = get(
      this.props,
      'data.userDetails.isFirstTimeCustomer',
      false
    );

    return (
      <div>
        <Loader show={loading} backdrop={true} />
        <AddressForm
          successCallback={this.successCallback}
          handleAddressAction={handleAddressAction}
          mode="mobile"
          addressInfo={addressInfo}
          isNewUser={isNewUser}
        />
      </div>
    );
  }
}

export default AddressFormPage;
