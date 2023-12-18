import { QUERY } from '../constants/index.js';
import { Calendar, Workers } from '../models/index.js';
import { InputView, OutputView } from '../views/index.js';

const InputController = {
  async getCalendar() {
    let result;

    while (!result) {
      try {
        const value = await InputView.getValue(QUERY.workDate);
        result = new Calendar(value).getState();
      } catch (error) {
        const { message } = error;
        OutputView.print(`\n${message}`);
      }
    }

    return result;
  },

  async getWorkers() {
    let result = {
      weekday: undefined,
      holiday: undefined,
    };

    while (!result.weekday || !result.holiday) {
      try {
        // 평일
        const weekdayNames = await InputView.getValue(QUERY.weekday);

        result.weekday = new Workers(weekdayNames).getState();
        //휴일
        const holidayNames = await InputView.getValue(QUERY.holiday);

        result.holiday = new Workers(holidayNames).getState();
      } catch (error) {
        const { message } = error;
        OutputView.print(message);
      }
    }

    return result;
  },
};

export default InputController;
