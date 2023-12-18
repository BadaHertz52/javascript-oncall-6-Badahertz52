import { ERROR_MESSAGE } from '../src/constants/index.js';
import { Calendar } from '../src/models/index.js';

describe('Calendar 앱 테스트', () => {
  test('잘못된 비상 근무 월,시작 요일을  입력할 경우 오류 발생', () => {
    const WRONG_INPUTS = ['4', '4 화', '4화', '4-화', '4-화요일'];

    WRONG_INPUTS.forEach((v) => {
      expect(() => new Calendar(v)).toThrow(ERROR_MESSAGE);
    });
  });

  test('유효한 입력값을 입력하면, 해당 월에 대한 캘린더(날짜,요일,주말여부,법정공휴일 여부가 담김)를 반환', () => {
    const INPUT = '3,월';
    const EXPECTED = [
      { month: 3, day: '월', date: 1, isWeekend: false, isPublicHoliday: true },
      {
        month: 3,
        day: '화',
        date: 2,
        isWeekend: false,
        isPublicHoliday: false,
      },
      { month: 3, day: '토', date: 6, isWeekend: true, isPublicHoliday: false },
    ];

    const calendar = new Calendar(INPUT).getState();

    expect(calendar[0]).toEqual(EXPECTED[0]);
    expect(calendar[1]).toEqual(EXPECTED[1]);
    expect(calendar[5]).toEqual(EXPECTED[2]);
  });
});
