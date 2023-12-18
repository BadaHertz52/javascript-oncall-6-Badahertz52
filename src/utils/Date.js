import { DAYS, MONTH } from '../constants/index.js';
/**
 * @param {number} month
 */
export const getLastDate = (month) =>
  month === 2 ? 28 : MONTH.thirty.includes(month) ? 30 : 31;
/**
 * day를 시작점으로 하는 일주일을 반환 (ex: day-토. week- ['토','일','월','화','수','목','금'])
 * @param {'월'|'화'|'수'|'목'|'금'|'토'|'일'}day
 * @return {('월' | '화' | '수' | '목' | '금' | '토' | '일')[]}
 */
export const getNewWeek = (day) => {
  const index = DAYS.indexOf(day);

  return index ? DAYS.slice(index).concat(DAYS.slice(0, index)) : DAYS;
};
