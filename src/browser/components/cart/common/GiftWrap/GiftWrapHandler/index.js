import React from 'react';
import { setDocTitleInMobile, scrollIntoView } from 'commonBrowserUtils/Helper';

class GiftWrapHandler extends React.Component {
  constructor(props) {
    super(props);
    let { recipient, message, sender } = this.props.details || {};
    this.state = {
      recipientName: { value: recipient || '', errorMessage: '' },
      message: { value: message || '', errorMessage: '' },
      senderName: { value: sender || '', errorMessage: '' },
      giftWrapApplied: false,
      selectedField: null,
      rows: 1,
      loading: false
    };
    this.fields = [
      { name: 'recipientName', errorMessage: 'Please enter a name' },
      { name: 'message', errorMessage: 'Please enter a message' },
      { name: 'senderName', errorMessage: 'Please enter a name' }
    ];
    this.setValue = this.setValue.bind(this);
    this.validate = this.validate.bind(this);
    this.resetErrorMessages = this.resetErrorMessages.bind(this);
    this.applyGiftwrap = this.applyGiftwrap.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onTextAreaChange = this.onTextAreaChange.bind(this);
    this.props.setMessage && this.props.setMessage('');
  }

  componentDidMount() {
    setDocTitleInMobile('GIFT WRAP');
  }

  onSuccess() {
    const { showNotification, goBack } = this.props;
    this.setState({ giftWrapApplied: true });
    showNotification &&
      SHELL.alert('info', {
        message: 'Your order will arrive gift wrapped',
        styleOverrides: {
          notifyMainDiv: 'bottom: 80px;',
          notifyTextDiv: 'width: auto;'
        }
      });
    goBack && goBack();
  }

  onError() {
    this.setState({ error: 'Ooops, Something went wrong' });
  }

  applyGiftwrap() {
    const status = this.validate();
    let { recipientName, message, senderName } = this.state;
    if (status) {
      let data = {
        recipient: { name: recipientName.value },
        message: message.value,
        sender: { name: senderName.value }
      };
      this.props.handleCartAction(
        'applyGiftwrap',
        data,
        this.onSuccess,
        this.onError
      );
    }
  }

  resetErrorMessages() {
    this.fields.forEach(field => {
      this.setState({
        [field.name]: { ...this.state[field.name], errorMessage: '' }
      });
    });
  }

  validate() {
    this.resetErrorMessages();
    let status = true,
      firstErrorField;
    this.fields.forEach(field => {
      let value = this.state[field.name].value.trim();
      if (!value) {
        firstErrorField =
          firstErrorField || document.getElementById(field.name);
        this.setState({
          [field.name]: {
            ...this.state[field.name],
            errorMessage: field.errorMessage
          }
        });
        status = false;
      }
    });
    scrollIntoView(firstErrorField, { behavior: 'smooth', block: 'center' });
    return status;
  }

  setValue(event) {
    const {
      target: { id: field = '', maxLength, value = '' }
    } = event;

    if (maxLength && value.length > maxLength) {
      return;
    }

    this.setState({
      [field]: { ...this.state[field], value }
    });
  }

  onFocusHandler(e) {
    const field = e.target.id || '';
    this.setState({
      selectedField: e.target.id,
      [field]: { ...this.state[field], errorMessage: '' }
    });
  }

  onBlurHandler() {
    this.setState({ selectedField: '' });
  }

  onTextAreaChange(e) {
    const rows = Math.floor(e.target.value.length / 30 + 1);
    this.state.rows !== rows && this.setState({ rows });
    this.setValue(e);
  }

  render() {
    let {
      state,
      resetErrorMessages,
      validate,
      setValue,
      applyGiftwrap,
      onFocusHandler,
      onBlurHandler,
      onTextAreaChange
    } = this;
    return this.props.render({
      state,
      resetErrorMessages,
      validate,
      setValue,
      applyGiftwrap,
      onFocusHandler,
      onBlurHandler,
      onTextAreaChange
    });
  }
}

export default GiftWrapHandler;
