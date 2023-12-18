import { getLastDate } from '../utils';

class Schedule {
  #expandedWorkers;
  #schedule;
  /**
   * @param {{month: number,day: string,date: number,isWeekend: boolean, isPublicHoliday: boolean}[]} calendar
   * @param {{weekday: string[],holiday:string[]}} workers
   */
  constructor(calendar, workers) {
    this.#setExpandedWorkers(workers);
    this.#setSchedule(calendar);
  }

  #setExpandedWorkers(workers) {
    const { weekday, holiday } = workers;

    this.#expandedWorkers = {
      weekday: Array.from(
        { length: 31 },
        (v, index) => weekday[index % weekday.length],
      ),
      holiday: Array.from(
        { length: 15 },
        (v, index) => holiday[index % holiday.length],
      ),
    };
  }

  /**
   * 앞의 근무자와 연속된 근무자일 경우, 뒤의 근무자와 순서를 변경
   * @param {{month: number ;day: string;date: number;isWeekend: boolean;isPublicHoliday: boolean; worker: string;}[]} array
   * @returns
   */
  #checkContinuousWork(array) {
    array.forEach((v, index) => {
      const previous = array[index - 1];
      const next = array[index + 1];
      const isDuplicated = previous?.worker === v.worker;

      if (isDuplicated) {
        const newItem = { ...v, worker: next.worker };
        const newNext = { ...next, worker: v.worker };
        array.splice(index, 1, newItem);
        array.splice(index + 1, 1, newNext);
      }
    });

    return array;
  }
  /**
   * @param  {{month: number;day: string;date: number;isWeekend: boolean;isPublicHoliday: boolean}[]} calendar
   */
  #setSchedule(calendar) {
    const month = calendar[0].month;
    const lastDate = getLastDate(month);
    const array = calendar.map((v) => {
      const { isWeekend, isPublicHoliday } = v;
      const isHoliday = isWeekend || isPublicHoliday;
      let worker;

      isHoliday
        ? (worker = this.#expandedWorkers.holiday.shift())
        : (worker = this.#expandedWorkers.weekday.shift());

      return {
        ...v,
        worker: worker,
      };
    });

    this.#schedule = this.#checkContinuousWork(array).slice(0, lastDate);
  }

  getSchedule() {
    return this.#schedule;
  }
}
export default Schedule;
