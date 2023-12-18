import CustomError from './CustomError.js';
import { DAYS, REG_EXP, RULE, SEPARATOR, WEEKEND } from '../constants/index.js';
import { getLastDate, getNewWeek } from '../utils/index.js';

class Calendar {
  /**@type {{month: number;day: string;date: number;isWeekend: boolean;isPublicHoliday: boolean}[]|undefined} */
  #calendar;

  constructor(string) {
    this.#validateWorkDate(string);
    this.#setState(string);
  }

  #validateWorkDate(string) {
    const passFormat = REG_EXP.workDate.test(string);
    const passDay = DAYS.includes(string.split(SEPARATOR)[1]);

    if (!(passFormat && passDay)) {
      throw new CustomError();
    }
  }

  #changeToTwoDigits(number) {
    return number < 10 ? `0${number}` : `${number}`;
  }
  /**
   * @param {number} month
   * @param {number} date
   * @returns
   */
  #changeFormat(month, date) {
    return `${this.#changeToTwoDigits(month)}${this.#changeToTwoDigits(date)}`;
  }
  /**
   * @param {number} lastDate
   * @param {('월' | '화' | '수' | '목' | '금' | '토' | '일')[]} week
   * @param {number} month
   */
  #makeCalendar(lastDate, week, month) {
    //순번 교체를 위해서 일수 보다 하나 더 많은 배열 생성
    return Array.from({ length: lastDate + 1 }, (v, index) => {
      const date = this.#changeFormat(month, index + 1);
      const isPublicHoliday = RULE.holidays.includes(date);
      const day = week[index % 7];
      const isWeekend = WEEKEND.includes(day);

      return {
        month: month,
        day: day,
        date: index + 1,
        isWeekend: isWeekend,
        isPublicHoliday: isPublicHoliday,
      };
    });
  }

  #setState(string) {
    const [month, day] = string.split(SEPARATOR);
    const lastDate = getLastDate(Number(month));
    const week = getNewWeek(day);

    this.#calendar = this.#makeCalendar(lastDate, week, Number(month));
  }

  getState() {
    return this.#calendar;
  }
}
export default Calendar;
