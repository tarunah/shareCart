import {
  isLocalStorageEnabled,
  isLoggedIn,
  getUidx
} from 'commonBrowserUtils/Helper';
import get from 'lodash/get';
import RequestManager from 'commonUtils/RequestManager';
import config from '../../config';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { localStorageKeys } from 'commonUtils/constants';

const USER_PROFILE_LOCAL_STORAGE_KEY = (localStorageKeys || {}).USER_PROFILE;

const ProfileManager = (function() {
  const refreshProfileCache = (done, details) => {
    if (isLocalStorageEnabled()) {
      if (details && details.name) {
        localStorage.setItem(
          USER_PROFILE_LOCAL_STORAGE_KEY,
          JSON.stringify({
            time: Date.now(),
            details
          })
        );
      } else {
        localStorage.removeItem(USER_PROFILE_LOCAL_STORAGE_KEY);
      }
    }
    setProfileDetails(details);
    done && typeof done === 'function' && done();
  };

  const setProfileDetails = details => {
    if (details) {
      let profileDetails = get(window, '_checkout_.__myx_profile__');
      if (profileDetails) {
        const { contact = {}, name } = details || {};
        profileDetails.mobile = contact.phone;
        profileDetails.email = contact.email;
        profileDetails.name = name;
      }
    }
  };

  const makeNetworkRequest = done => {
    const profileConfig = config('profile');
    RequestManager.handle(
      {
        method: 'get',
        url: `${profileConfig.clientRoot}${profileConfig.path}`
      },
      response => refreshProfileCache(done, response),
      () => refreshProfileCache(done, null)
    );
  };

  const refreshProfileInfo = done => {
    try {
      const { enable, expiryTimeInMins = 30 } =
        getKVPairValue('USER_PROFILE_CACHE_CONFIG') || {};
      if (isLoggedIn()) {
        if (enable) {
          const { time = 0, details = null } =
            (isLocalStorageEnabled() &&
              JSON.parse(
                localStorage.getItem(USER_PROFILE_LOCAL_STORAGE_KEY) || '{}'
              )) ||
            {};
          const timeExpired = time
            ? Date.now() - time > expiryTimeInMins * 60 * 1000
            : true;
          const stale = details ? details.uidx !== getUidx() : true;
          if (details && !timeExpired && !stale) {
            setProfileDetails(details);
            return done && typeof done === 'function' && done();
          }
        }
        makeNetworkRequest(done);
      } else {
        refreshProfileCache(done, null);
      }
    } catch (e) {
      makeNetworkRequest(done);
    }
  };

  return {
    prefetchDetails: () => {
      const { enable, allowPrefetch } =
        getKVPairValue('USER_PROFILE_CACHE_CONFIG') || {};
      if (isLocalStorageEnabled() && enable && allowPrefetch) {
        window.requestIdleCallback
          ? window.requestIdleCallback(refreshProfileInfo)
          : refreshProfileInfo();
      }
    },
    fetchDetails: done => {
      refreshProfileInfo(done);
    }
  };
})();

export default ProfileManager;
