import ProfileManager from './ProfileManager';
import RequestManager from 'commonUtils/RequestManager';
import sinon from 'sinon';

const profileResponse = {
  uidx: 'testUidx',
  contact: {
    phone: '1234512345',
    email: 'test@gmail.com'
  },
  name: {
    firstname: 'test'
  }
};

describe('Profile Manager', () => {
  beforeEach(() => {
    window._checkout_ = {};
    window._checkout_.__myx_kvpairs__ = {};
    window._checkout_.__myx_profile__ = {
      uidx: 'testUidx',
      userHashId: 'testUidxHash'
    };
    localStorage.removeItem('myProfile');
  });

  it('should fetch the user details - logged in - kvpair enabled', () => {
    const done = sinon.spy();
    RequestManager.handle = (p, scb, ecb) => scb(profileResponse);
    window._checkout_.__myx_kvpairs__['checkout.userProfileCache.config'] = {
      enable: true,
      expiryTimeInMins: 30,
      allowPrefetch: true
    };
    window.requestIdleCallback = null;
    document.cookie = 'ilgim=true';
    ProfileManager.fetchDetails(done);

    const cachedRes = JSON.parse(localStorage.getItem('myProfile'));
    const profile = window._checkout_.__myx_profile__;

    expect(cachedRes).not.toBe(null);

    expect(JSON.stringify(cachedRes.details)).toBe(
      JSON.stringify(profileResponse)
    );

    expect(profile.uidx).toBe('testUidx');
    expect(profile.userHashId).toBe('testUidxHash');
    expect(profile.mobile).toBe('1234512345');
    expect(profile.email).toBe('test@gmail.com');
    expect(profile.name.firstname).toBe('test');

    expect(done.callCount).toBe(1);
  });

  it('should prefetch the data - logged in - kvpair enabled', () => {
    const done = sinon.spy();
    RequestManager.handle = (p, scb, ecb) => scb(profileResponse);
    window._checkout_.__myx_kvpairs__['checkout.userProfileCache.config'] = {
      enable: true,
      expiryTimeInMins: 30,
      allowPrefetch: true
    };
    window.requestIdleCallback = null;
    document.cookie = 'ilgim=true';
    ProfileManager.prefetchDetails();

    const cachedRes = JSON.parse(localStorage.getItem('myProfile'));
    const profile = window._checkout_.__myx_profile__;

    expect(cachedRes).not.toBe(null);

    expect(JSON.stringify(cachedRes.details)).toBe(
      JSON.stringify(profileResponse)
    );

    expect(profile.uidx).toBe('testUidx');
    expect(profile.userHashId).toBe('testUidxHash');
    expect(profile.mobile).toBe('1234512345');
    expect(profile.email).toBe('test@gmail.com');
    expect(profile.name.firstname).toBe('test');

    expect(done.callCount).toBe(0);
  });

  it('should prefetch the data - non logged in', () => {
    RequestManager.handle = (p, scb, ecb) => scb(profileResponse);
    window._checkout_.__myx_kvpairs__['checkout.userProfileCache.config'] = {
      enable: true,
      expiryTimeInMins: 30,
      allowPrefetch: true
    };
    window.requestIdleCallback = null;
    document.cookie = 'ilgim=false';
    ProfileManager.prefetchDetails();

    const cachedRes = JSON.parse(localStorage.getItem('myProfile'));
    const profile = window._checkout_.__myx_profile__;

    expect(cachedRes).toBe(null);

    expect(profile.uidx).toBe('testUidx');
    expect(profile.userHashId).toBe('testUidxHash');
    expect(profile.mobile).toBe(undefined);
    expect(profile.email).toBe(undefined);
    expect(profile.name).toBe(undefined);
  });

  it('should fetch the data - non logged in', () => {
    const done = sinon.spy();
    RequestManager.handle = (p, scb, ecb) => scb(profileResponse);
    window._checkout_.__myx_kvpairs__['checkout.userProfileCache.config'] = {
      enable: true,
      expiryTimeInMins: 30,
      allowPrefetch: true
    };
    window.requestIdleCallback = null;
    document.cookie = 'ilgim=false';
    ProfileManager.fetchDetails(done);

    const cachedRes = JSON.parse(localStorage.getItem('myProfile'));
    const profile = window._checkout_.__myx_profile__;

    expect(cachedRes).toBe(null);

    expect(profile.uidx).toBe('testUidx');
    expect(profile.userHashId).toBe('testUidxHash');
    expect(profile.mobile).toBe(undefined);
    expect(profile.email).toBe(undefined);
    expect(profile.name).toBe(undefined);

    expect(done.callCount).toBe(1);
  });

  it('should prefetch the data - logged in - kvpair disabled', () => {
    RequestManager.handle = (p, scb, ecb) => scb(profileResponse);
    window._checkout_.__myx_kvpairs__['checkout.userProfileCache.config'] = {
      enable: false,
      expiryTimeInMins: 30,
      allowPrefetch: true
    };
    window.requestIdleCallback = null;
    document.cookie = 'ilgim=true';
    ProfileManager.prefetchDetails();

    const cachedRes = JSON.parse(localStorage.getItem('myProfile'));
    const profile = window._checkout_.__myx_profile__;

    expect(cachedRes).toBe(null);

    expect(profile.uidx).toBe('testUidx');
    expect(profile.userHashId).toBe('testUidxHash');
    expect(profile.mobile).toBe(undefined);
    expect(profile.email).toBe(undefined);
    expect(profile.name).toBe(undefined);
  });

  it('should fetch the data - logged in - kvpair disabled', () => {
    const done = sinon.spy();
    RequestManager.handle = (p, scb, ecb) => scb(profileResponse);
    window._checkout_.__myx_kvpairs__['checkout.userProfileCache.config'] = {
      enable: false,
      expiryTimeInMins: 30,
      allowPrefetch: true
    };
    window.requestIdleCallback = null;
    document.cookie = 'ilgim=true';
    ProfileManager.fetchDetails(done);

    const cachedRes = JSON.parse(localStorage.getItem('myProfile'));
    const profile = window._checkout_.__myx_profile__;

    expect(JSON.stringify(cachedRes.details)).toBe(
      JSON.stringify(profileResponse)
    );

    expect(profile.uidx).toBe('testUidx');
    expect(profile.userHashId).toBe('testUidxHash');
    expect(profile.mobile).toBe('1234512345');
    expect(profile.email).toBe('test@gmail.com');
    expect(profile.name.firstname).toBe('test');

    expect(done.callCount).toBe(1);
  });

  it('should prefetch the data - logged in - error callback', () => {
    RequestManager.handle = (p, scb, ecb) => ecb();
    window._checkout_.__myx_kvpairs__['checkout.userProfileCache.config'] = {
      enable: false,
      expiryTimeInMins: 30,
      allowPrefetch: true
    };
    window.requestIdleCallback = null;
    document.cookie = 'ilgim=true';
    ProfileManager.prefetchDetails();

    const cachedRes = JSON.parse(localStorage.getItem('myProfile'));
    const profile = window._checkout_.__myx_profile__;

    expect(cachedRes).toBe(null);

    expect(profile.uidx).toBe('testUidx');
    expect(profile.userHashId).toBe('testUidxHash');
    expect(profile.mobile).toBe(undefined);
    expect(profile.email).toBe(undefined);
    expect(profile.name).toBe(undefined);
  });

  it('should fetch the data - logged in - error callback', () => {
    const done = sinon.spy();
    RequestManager.handle = (p, scb, ecb) => ecb();
    window._checkout_.__myx_kvpairs__['checkout.userProfileCache.config'] = {
      enable: false,
      expiryTimeInMins: 30,
      allowPrefetch: true
    };
    window.requestIdleCallback = null;
    document.cookie = 'ilgim=true';
    ProfileManager.fetchDetails(done);

    const cachedRes = JSON.parse(localStorage.getItem('myProfile'));
    const profile = window._checkout_.__myx_profile__;

    expect(cachedRes).toBe(null);

    expect(profile.uidx).toBe('testUidx');
    expect(profile.userHashId).toBe('testUidxHash');
    expect(profile.mobile).toBe(undefined);
    expect(profile.email).toBe(undefined);
    expect(profile.name).toBe(undefined);

    expect(done.callCount).toBe(1);
  });

  it('should prefetch the data - logged in - success callback with invalid value', () => {
    RequestManager.handle = (p, scb, ecb) => scb({});
    window._checkout_.__myx_kvpairs__['checkout.userProfileCache.config'] = {
      enable: false,
      expiryTimeInMins: 30,
      allowPrefetch: true
    };
    window.requestIdleCallback = null;
    document.cookie = 'ilgim=true';
    ProfileManager.prefetchDetails();

    const cachedRes = JSON.parse(localStorage.getItem('myProfile'));
    const profile = window._checkout_.__myx_profile__;

    expect(cachedRes).toBe(null);

    expect(profile.uidx).toBe('testUidx');
    expect(profile.userHashId).toBe('testUidxHash');
    expect(profile.mobile).toBe(undefined);
    expect(profile.email).toBe(undefined);
    expect(profile.name).toBe(undefined);
  });

  it('should fetch the data - logged in - success callback with invalid value', () => {
    const done = sinon.spy();
    RequestManager.handle = (p, scb, ecb) => scb({});
    window._checkout_.__myx_kvpairs__['checkout.userProfileCache.config'] = {
      enable: false,
      expiryTimeInMins: 30,
      allowPrefetch: true
    };
    window.requestIdleCallback = null;
    document.cookie = 'ilgim=true';
    ProfileManager.fetchDetails(done);

    const cachedRes = JSON.parse(localStorage.getItem('myProfile'));
    const profile = window._checkout_.__myx_profile__;

    expect(cachedRes).toBe(null);

    expect(profile.uidx).toBe('testUidx');
    expect(profile.userHashId).toBe('testUidxHash');
    expect(profile.mobile).toBe(undefined);
    expect(profile.email).toBe(undefined);
    expect(profile.name).toBe(undefined);
    expect(done.callCount).toBe(1);
  });

  it('should prefetch the data - logged in - prefetch disabled', () => {
    RequestManager.handle = (p, scb, ecb) => scb(profileResponse);
    window._checkout_.__myx_kvpairs__['checkout.userProfileCache.config'] = {
      enable: true,
      expiryTimeInMins: 30,
      allowPrefetch: false
    };
    window.requestIdleCallback = null;
    document.cookie = 'ilgim=true';
    ProfileManager.prefetchDetails();

    const cachedRes = JSON.parse(localStorage.getItem('myProfile'));
    const profile = window._checkout_.__myx_profile__;

    expect(cachedRes).toBe(null);

    expect(profile.uidx).toBe('testUidx');
    expect(profile.userHashId).toBe('testUidxHash');
    expect(profile.mobile).toBe(undefined);
    expect(profile.email).toBe(undefined);
    expect(profile.name).toBe(undefined);
  });

  it('should server from cache - logged in - kvpair enabled', () => {
    window.requestManagerCount = 0;
    RequestManager.handle = (p, scb, ecb) => {
      window.requestManagerCount++;
      return scb(profileResponse);
    };
    window._checkout_.__myx_kvpairs__['checkout.userProfileCache.config'] = {
      enable: true,
      expiryTimeInMins: 30,
      allowPrefetch: true
    };
    window.requestIdleCallback = null;
    document.cookie = 'ilgim=true';
    ProfileManager.prefetchDetails();

    const cachedRes = JSON.parse(localStorage.getItem('myProfile'));
    expect(cachedRes).not.toBe(null);
    expect(JSON.stringify(cachedRes.details)).toBe(
      JSON.stringify(profileResponse)
    );

    ProfileManager.prefetchDetails();
    const profile = window._checkout_.__myx_profile__;

    expect(window.requestManagerCount).toBe(1);

    expect(profile.uidx).toBe('testUidx');
    expect(profile.userHashId).toBe('testUidxHash');
    expect(profile.mobile).toBe('1234512345');
    expect(profile.email).toBe('test@gmail.com');
    expect(profile.name.firstname).toBe('test');
  });

  it('should not serve from cache when uidx is different', () => {
    window.requestManagerCount = 0;
    RequestManager.handle = (p, scb, ecb) => {
      window.requestManagerCount++;
      return scb(profileResponse);
    };
    window._checkout_.__myx_kvpairs__['checkout.userProfileCache.config'] = {
      enable: true,
      expiryTimeInMins: 30,
      allowPrefetch: true
    };
    window.requestIdleCallback = null;
    document.cookie = 'ilgim=true';
    ProfileManager.prefetchDetails();

    const cachedRes = JSON.parse(localStorage.getItem('myProfile'));
    expect(cachedRes).not.toBe(null);

    window._checkout_.__myx_profile__.uidx = 't1';
    ProfileManager.prefetchDetails();
    const profile = window._checkout_.__myx_profile__;

    expect(window.requestManagerCount).toBe(2);

    expect(profile.uidx).toBe('t1');
    expect(profile.userHashId).toBe('testUidxHash');
    expect(profile.mobile).toBe('1234512345');
    expect(profile.email).toBe('test@gmail.com');
    expect(profile.name.firstname).toBe('test');
  });

  it('should invalidate cache after expiry', done => {
    window.requestManagerCountInv = 0;
    RequestManager.handle = (p, scb, ecb) => {
      window.requestManagerCountInv++;
      return scb(profileResponse);
    };
    window._checkout_.__myx_kvpairs__['checkout.userProfileCache.config'] = {
      enable: true,
      expiryTimeInMins: 0.001,
      allowPrefetch: true
    };
    window.requestIdleCallback = null;
    document.cookie = 'ilgim=true';
    ProfileManager.prefetchDetails();

    const cachedRes = JSON.parse(localStorage.getItem('myProfile'));
    expect(cachedRes).not.toBe(null);
    setTimeout(() => {
      ProfileManager.prefetchDetails();

      expect(window.requestManagerCountInv).toBe(2);
      const profile = window._checkout_.__myx_profile__;
      expect(profile.uidx).toBe('testUidx');
      expect(profile.userHashId).toBe('testUidxHash');
      expect(profile.mobile).toBe('1234512345');
      expect(profile.email).toBe('test@gmail.com');
      expect(profile.name.firstname).toBe('test');

      done();
    }, 100);

    expect(window.requestManagerCountInv).toBe(1);
  });

  it('should npot fail when local storage has invalid value', () => {
    const done = sinon.spy();

    window._checkout_.__myx_kvpairs__['checkout.userProfileCache.config'] = {
      enable: true,
      expiryTimeInMins: 0.01,
      allowPrefetch: true
    };
    window.requestIdleCallback = null;
    document.cookie = 'ilgim=true';

    localStorage.setItem('myProfile', '');

    ProfileManager.fetchDetails(done);

    const profile = window._checkout_.__myx_profile__;

    expect(profile.uidx).toBe('testUidx');
    expect(profile.userHashId).toBe('testUidxHash');
    expect(profile.mobile).toBe('1234512345');
    expect(profile.email).toBe('test@gmail.com');
    expect(profile.name.firstname).toBe('test');
    expect(done.callCount).toBe(1);
  });
});
