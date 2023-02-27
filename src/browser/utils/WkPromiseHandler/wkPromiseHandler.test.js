import sinon from 'sinon';
import wkPromiseHandler from './';

window._checkout_ = {
  __myx_deviceData__: {
    isApp: true,
    isIOS: true
  }
};

describe('wkPromiseHandler', () => {
  it('should resolve a promise if web kit handler is available', () => {
    const updateFeedbackAttempt = sinon.spy();
    window.webkit = {
      messageHandlers: {
        updateFeedbackAttempt: {
          postMessage: updateFeedbackAttempt
        }
      }
    };

    const generateUUID = sinon.stub(wkPromiseHandler, 'generateUUID');
    generateUUID.callsFake(() => {
      return 'xxx-123-xxx';
    });
    const wkPromise = wkPromiseHandler.callWKHandler(
      ['updateFeedbackAttempt'],
      {}
    );
    window.resolveWKPromise('xxx-123-xxx', { a: '1' }, null);
    wkPromise.then(data => expect(data).toEqual({ a: '1' }));
  });

  it('should reject a promise if web kit handler is not available', () => {
    window.webkit = {
      messageHandlers: {}
    };
    expect(
      wkPromiseHandler.callWKHandler(['updateFeedbackAttempt'], {})
    ).rejects.toThrowError(new Error('Webkit Handler not found'));
  });
});
