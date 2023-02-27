import { isMyntAppEnabled, isWebkitEnabled } from 'commonBrowserUtils/Helper';
import wkPromiseHandler from 'commonBrowserUtils/WkPromiseHandler';
import { getKVPairValue } from 'commonUtils/KVPairManager';

export const AndroidBridgeHelper = {
  recordOrderComplete: (...data) => {
    return (
      isMyntAppEnabled(['recordOrderComplete']) &&
      MyntApp.recordOrderComplete(...data)
    );
  },
  autofillEnabled: () => {
    return (
      (isMyntAppEnabled(['startSmsReceiver']) ||
        isMyntAppEnabled(['startSmsReceiverV1'])) &&
      isMyntAppEnabled(['stopSmsReceiver', 'getAppVersion']) &&
      MyntApp.getAppVersion()
        .toString()
        .slice(-6) >= 110197
    );
  },
  startSmsReceiver: field => {
    return (
      isMyntAppEnabled(['getAppVersion']) &&
      MyntApp.getAppVersion()
        .toString()
        .slice(-6) >= 110197 &&
      (isMyntAppEnabled(['startSmsReceiverV1'])
        ? MyntApp.startSmsReceiverV1(field)
        : isMyntAppEnabled(['startSmsReceiver']) && MyntApp.startSmsReceiver())
    );
  },
  stopSmsReceiver: () => {
    return (
      isMyntAppEnabled(['stopSmsReceiver', 'getAppVersion']) &&
      MyntApp.getAppVersion()
        .toString()
        .slice(-6) >= 110197 &&
      MyntApp.stopSmsReceiver()
    );
  },
  getAllInstalledUPIApps: () => {
    const packageMap = getKVPairValue('UPI_CONFIG').upiPackageMap;
    let installedAppsConfig = isMyntAppEnabled(['getAllInstalledUPIApps'])
      ? MyntApp.getAllInstalledUPIApps()
      : '{}';
    let installedApps = [];
    let upiSDKEnabled = false;

    try {
      installedAppsConfig = JSON.parse(installedAppsConfig);
      if (installedAppsConfig.apps) {
        installedApps = installedAppsConfig.apps.map(
          app => packageMap[app.package_name] || app.package_name
        );
      }
      upiSDKEnabled = installedAppsConfig.upiSDKEnabled;
    } catch (err) {}

    return {
      installedApps,
      upiSDKEnabled
    };
  },
  getSupportedUPIPg: () => {
    let supportedPG = isMyntAppEnabled(['getSupportedPG'])
      ? MyntApp.getSupportedPG()
      : '[]';
    return supportedPG;
  },
  openAppSettings: () => {
    return isMyntAppEnabled(['openAppSettings']) && MyntApp.openAppSettings();
  },
  onRewardFlowDone: (...data) => {
    return (
      isMyntAppEnabled(['onRewardFlowDone']) &&
      MyntApp.onRewardFlowDone(...data)
    );
  }
};

export const IOSBridgeHelper = {
  recordOrderComplete: data => {
    return (
      isWebkitEnabled(['recordOrderComplete']) &&
      webkit.messageHandlers.recordOrderComplete.postMessage(data)
    );
  },

  openAppSettings: () => {
    return (
      isWebkitEnabled(['openAppSettings']) &&
      webkit.messageHandlers.openAppSettings.postMessage({})
    );
  },

  onRewardFlowDone: data => {
    return (
      isWebkitEnabled(['onRewardFlowDone']) &&
      webkit.messageHandlers.onRewardFlowDone.postMessage(data)
    );
  },

  getAllInstalledUPIAppsPromise: () => {
    return new Promise(resolve => {
      wkPromiseHandler
        .callWKHandler(['getAllInstalledUPIApps'])
        .then(({ apps, upiSDKEnabled }) => {
          if (apps) {
            resolve({
              installedApps: (apps.filter(app => app.status) || []).map(
                app => app.appName
              ),
              upiSDKEnabled: !!upiSDKEnabled
            });
          } else {
            resolve({
              installedApps: [],
              upiSDKEnabled: false
            });
          }
        })
        .catch(() => {
          resolve({
            installedApps: [],
            upiSDKEnabled: false
          });
        });
    });
  }
};
