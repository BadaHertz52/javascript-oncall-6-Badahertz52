export const RULE = Object.freeze({
  holidays: Object.freeze([
    '0101',
    '0301',
    '0505',
    '0606',
    '0815',
    '1003',
    '1009',
    '1225',
  ]),
});
export const DAYS = Object.freeze(['월', '화', '수', '목', '금', '토', '일']);
export const SEPARATOR = Object.freeze(',');
export const REG_EXP = Object.freeze({
  workDate: new RegExp('^([1-9]|[1][0-2]),[가-힣]$'),
  name: new RegExp('^[a-zA-z가-힣]{0,5}$'),
});
