import moment from 'moment';

const d3 = require('d3');

export function UTC(dttm) {
  return new Date(
    dttm.getUTCFullYear(),
    dttm.getUTCMonth(),
    dttm.getUTCDate(),
    dttm.getUTCHours(),
    dttm.getUTCMinutes(),
    dttm.getUTCSeconds(),
  );
}
export const tickMultiFormat = d3.time.format.multi([
  [
    '.%L',
    function (d) {
      return d.getMilliseconds();
    },
  ],
  // If there are millisections, show  only them
  [
    ':%S',
    function (d) {
      return d.getSeconds();
    },
  ],
  // If there are seconds, show only them
  [
    '%a %b %d, %I:%M %p',
    function (d) {
      return d.getMinutes() !== 0;
    },
  ],
  // If there are non-zero minutes, show Date, Hour:Minute [AM/PM]
  [
    '%a %b %d, %I %p',
    function (d) {
      return d.getHours() !== 0;
    },
  ],
  // If there are hours that are multiples of 3, show date and AM/PM
  [
    '%a %b %d',
    function (d) {
      return d.getDate() !== 1;
    },
  ],
  // If not the first of the month, do "month day, year."
  [
    '%B %Y',
    function (d) {
      return d.getMonth() !== 0 && d.getDate() === 1;
    },
  ],
  // If the first of the month, do "month day, year."
  [
    '%Y',
    function () {
      return true;
    },
  ],  // fall back on month, year
]);
export const formatDate = function (dttm) {
  const d = UTC(new Date(dttm));
  return tickMultiFormat(d);
};

export const formatDateThunk = function (format) {
  if (!format) {
    return formatDate;
  }

  const formatter = d3.time.format(format);
  return (dttm) => {
    const d = UTC(new Date(dttm));
    return formatter(d);
  };
};

export const fDuration = function (t1, t2, format = 'HH:mm:ss.SS') {
  const diffSec = t2 - t1;
  const duration = moment(new Date(diffSec));
  return duration.utc().format(format);
};

export const now = function () {
  // seconds from EPOCH as a float
  return moment().utc().valueOf();
};

export const epochTimeXHoursAgo = function (h) {
  return moment()
    .subtract(h, 'hours')
    .utc()
    .valueOf();
};

export const epochTimeXDaysAgo = function (d) {
  return moment()
    .subtract(d, 'days')
    .utc()
    .valueOf();
};

export const epochTimeXYearsAgo = function (y) {
  return moment()
    .subtract(y, 'years')
    .utc()
    .valueOf();
};
