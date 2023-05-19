import moment from 'moment';

function formatTimeUTC7(time: Date | string, isDetail?: boolean) {
  if (isDetail) {
    const newDate = moment(time)
      .utcOffset('+0700')
      .format('HH:mm - DD/MM/YYYY');

    return newDate;
  } else {
    const newDate = moment(time).utcOffset('+0700').format('DD/MM/YYYY');

    return newDate;
  }
}

export default formatTimeUTC7;
