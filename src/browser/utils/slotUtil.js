import get from 'lodash/get';

const getSlots = showSlots => {
  const cookieString = document.cookie;
  let sdata = {};
  if (showSlots && cookieString) {
    const cookies = cookieString.split(';');
    let passCookie = cookies.find(val => {
      if (val) {
        const cookieName = val.split('=')[0];
        if (cookieName) {
          return (
            cookieName.trim() ===
            `${get(window, '_checkout_.__myx_env__.cookie.prefix')}stp`
          );
        }
      }
    });

    if (passCookie) {
      try {
        passCookie = passCookie.split('=')[1];
        passCookie = passCookie.replace(/"/g, '');
        passCookie = decodeURIComponent(passCookie);
        passCookie = passCookie.replace(/'/g, '"');
        sdata = JSON.parse(passCookie);
      } catch (e) {
        sdata = {};
      }
    }
  }
  return sdata;
};

const getTimeRange = (start, end) => {
  if (!start || !end) {
    return null;
  }
  let st;
  let et;
  let sHours = start.getHours();
  let sMins = start.getMinutes();
  let eHours = end.getHours();
  let eMins = end.getMinutes();
  if (sMins < 10) {
    sMins = `0${sMins}`;
  }
  if (eMins < 10) {
    eMins = `0${eMins}`;
  }
  if (sHours > 12) {
    st = `${sHours - 12}:${sMins}PM`;
  } else if (sHours === 0) {
    st = `12:${sMins}AM`;
  } else if (sHours === 12) {
    st = `12:${sMins}PM`;
  } else {
    st = `${sHours}:${sMins}AM`;
  }
  if (eHours > 12) {
    et = `${eHours - 12}:${eMins}PM`;
  } else if (eHours === 0) {
    et = `12:${eMins}AM`;
  } else if (eHours === 12) {
    et = `12:${eMins}PM`;
  } else {
    et = `${eHours}:${eMins}AM`;
  }
  return `${st}-${et}`;
};

const getSelectedSlotDateTime = _ => {
  let slotDateTime = '';
  let slots = getSlots(true) || {};
  let slotSelected = slots.sl;
  if (slotSelected) {
    let monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    let startDate = new Date(slotSelected.st);
    let endDate = new Date(slotSelected.et);
    slotDateTime =
      startDate && endDate
        ? `${getTimeRange(startDate, endDate)} on ${startDate.getDate()} ${
            monthNames[startDate.getMonth()]
          }`
        : '';
  }
  return slotDateTime;
};

export { getSelectedSlotDateTime };
