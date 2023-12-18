import { Calendar, Schedule } from './../src/models/index.js';

describe('Schedule 클래스 테스트', () => {
  const WORKERS = {
    weekday: [
      '허브',
      '쥬니',
      '말랑',
      '라온',
      '헤나',
      '우코',
      '에단',
      '수달',
      '파워',
      '히이로',
      '마코',
      '슬링키',
      '모디',
      '연어',
      '깃짱',
      '리오',
      '고니',
      '박스터',
      '달리',
      '조이',
      '노아이즈',
      '도이',
      '도치',
      '홍고',
      '스캇',
      '폴로',
      '해시',
      '로지',
      '첵스',
      '아이크',
      '우가',
      '푸만능',
      '애쉬',
      '로이스',
      '오션',
    ],
    holiday: [
      '오션',
      '로이스',
      '애쉬',
      '푸만능',
      '우가',
      '아이크',
      '첵스',
      '로지',
      '해시',
      '폴로',
      '스캇',
      '홍고',
      '도치',
      '도이',
      '노아이즈',
      '조이',
      '달리',
      '박스터',
      '고니',
      '리오',
      '깃짱',
      '연어',
      '모디',
      '슬링키',
      '마코',
      '히이로',
      '파워',
      '수달',
      '에단',
      '우코',
      '헤나',
      '라온',
      '말랑',
      '쥬니',
      '허브',
    ],
  };
  test('주말로 시작하는 달에 대한 테스트', () => {
    const month = 7;
    const calendar = new Calendar('7,토').getState();
    const schedule = new Schedule(calendar, WORKERS).getSchedule();

    expect(schedule[0]).toEqual({
      month: month,
      date: 1,
      day: '토',
      isWeekend: true,
      isPublicHoliday: false,
      worker: WORKERS.holiday[0],
    });

    expect(schedule[8]).toEqual({
      month: month,
      date: 9,
      day: '일',
      isWeekend: true,
      isPublicHoliday: false,
      worker: WORKERS.holiday[3],
    });

    expect(schedule[2]).toEqual({
      month: month,
      date: 3,
      day: '월',
      isWeekend: false,
      isPublicHoliday: false,
      worker: WORKERS.weekday[0],
    });
  });
  test('월요일이 아닌 평일로 시작하는 달에 대한 테스트', () => {
    const month = 8;
    const calendar = new Calendar(`${month},수`).getState();
    const schedule = new Schedule(calendar, WORKERS).getSchedule();

    expect(schedule[0]).toEqual({
      month: month,
      date: 1,
      isWeekend: false,
      day: '수',
      isPublicHoliday: false,
      worker: WORKERS.weekday[0],
    });

    expect(schedule[3]).toEqual({
      month: month,
      date: 4,
      day: '토',
      isWeekend: true,
      isPublicHoliday: false,
      worker: WORKERS.holiday[0],
    });

    expect(schedule[7]).toEqual({
      month: month,
      date: 8,
      day: '수',
      isWeekend: false,
      isPublicHoliday: false,
      worker: WORKERS.weekday[5],
    });
  });
  test('평일인 법정 공휴일이 있는 달에 대한 테스트', () => {
    const month = 10;
    const calendar = new Calendar(`${month},월`).getState();
    const schedule = new Schedule(calendar, WORKERS).getSchedule();

    expect(schedule[2]).toEqual({
      month: month,
      date: 3,
      day: '수',
      isWeekend: false,
      isPublicHoliday: true,
      worker: WORKERS.holiday[0],
    });
  });
});
