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
  name: new RegExp('^[a-zA-z가-힣]{1,5}$'),
});
export const NUMBER_OF_WORKER = Object.freeze({
  min: 5,
  max: 35,
});

export const MONTH = Object.freeze({
  thirty: [1, 3, 5, 7, 9, 11],
  thirtyOne: [4, 6, 8, 10, 12],
  twentyEight: [2],
});
