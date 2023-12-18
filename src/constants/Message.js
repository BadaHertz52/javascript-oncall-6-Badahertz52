export const MESSAGE = Object.freeze({});

export const QUERY = Object.freeze({
  workDate: '비상 근무를 배정할 월과 시작 요일을 입력하세요>',
  //월~금
  weekday: '평일 비상 근무 순번대로 사원 닉네임을 입력하세요>',
  //토요일, 일요일, 법정공휴일
  holiday: '휴일 비상 근무 순번대로 사원 닉네임을 입력하세요>',
});

export const PUBLIC_HOLIDAY = Object.freeze('(휴일)');

export const ERROR_MESSAGE = Object.freeze(
  '[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.',
);
