import PaymentOTPContainer from '../../common/PaymentOTPContainer';
import WithStyles from 'commonBrowserUtils/WithStyles';

import Styles from './paymentOTP.base.css';

const PaymentOTP = props => WithStyles(Styles)(PaymentOTPContainer, props);

export default PaymentOTP;
