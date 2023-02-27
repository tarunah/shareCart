import { isLoggedIn, getCookie } from 'commonBrowserUtils/Helper';
import { cookieKeys } from 'commonUtils/constants';
import get from 'lodash/get';

const isGreaterDate = date => {
  if (date) {
    const curDate = new Date().getTime();
    return date > curDate;
  }
  return false;
};

const isLesserDate = date => {
  if (date) {
    const curDate = new Date().getTime();
    return date < curDate;
  }
  return false;
};

const cookieExists = cname => {
  return getCookie(cname) || false;
};

const isSlotEntryEnabled = () => {
  return (
    cookieExists(cookieKeys.SLOT_TIMER_PASS) &&
    !cookieExists(cookieKeys.SLOT_TIMER_BLOCK)
  );
};

const inPriceRevealMode = priceRevealData => {
  let priceRevealMode = false;
  if (typeof priceRevealData === 'string') {
    try {
      priceRevealData = JSON.parse(priceRevealData);
      priceRevealMode = priceRevealData.enable === 'true';
    } catch (e) {
      console.log('price reveal data is not a proper json object');
    }
  } else if (typeof priceRevealData === 'object') {
    priceRevealMode = priceRevealData.enable === 'true';
  }
  return priceRevealMode;
};

const SlotTimer = {
  show: priceRevealData =>
    isSlotEntryEnabled() && inPriceRevealMode(priceRevealData) && isLoggedIn(),

  getTimerData: () => {
    let passCookie = getCookie(cookieKeys.SLOT_TIMER_PASS);
    let sdata = {};
    if (passCookie) {
      try {
        passCookie = decodeURIComponent(passCookie);
        passCookie = passCookie.replace(/'/g, '"');
        sdata = JSON.parse(passCookie);
      } catch (e) {
        sdata = {};
      }
      const startDate = get(sdata, 'sl.st');
      const endDate = get(sdata, 'sl.et');
      if (!startDate || !endDate) {
        return {};
      }

      return {
        startDate: startDate,
        endDate: endDate
      };
    }
    return {};
  }
};

const getSaleTimerData = saleBannerData => {
  if (saleBannerData && typeof saleBannerData === 'string') {
    try {
      saleBannerData = JSON.parse(saleBannerData);
    } catch (e) {
      console.log('sale timer data is not a proper json object');
    }
  }
  return saleBannerData;
};

const getSaleBannerData = (priceRevealData, saleBannerData) => {
  let slotDate = {};
  const showSlot = SlotTimer.show(priceRevealData);
  const saleBanner = getSaleTimerData(saleBannerData) || {};

  if (showSlot) {
    slotDate = SlotTimer.getTimerData();
  }

  if (
    showSlot &&
    isLesserDate(slotDate.startDate) &&
    isGreaterDate(slotDate.endDate)
  ) {
    return {
      showTimer: true,
      timerLabel: 'BUY WITHIN',
      timerEndDate: slotDate.endDate,
      timerImage: saleBanner.image
    };
  } else {
    const endDate = saleBanner.enddate
      ? new Date(saleBanner.enddate).getTime()
      : null;
    const isDateValid = isGreaterDate(endDate);
    if (isDateValid && saleBanner.enable === 'true') {
      return {
        showTimer: true,
        timerLabel: saleBanner.timerlabel,
        timerEndDate: endDate,
        timerImage: saleBanner.image
      };
    }
  }
  return { showTimer: false };
};

export { getSaleBannerData };
