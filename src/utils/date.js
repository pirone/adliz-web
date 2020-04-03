import moment from 'moment';

export function dateToString(date) {
  return moment(date).format('dd/MM/YYYY');
}
