import CustomError from '../CustomError.js';
import {
  DAYS,
  MONTH,
  NUMBER_OF_WORKER,
  QUERY,
  REG_EXP,
  SEPARATOR,
} from '../constants/index.js';
import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';

const InputController = {
  //유효성 검사
  validateWorkDate(string) {
    const passFormat = REG_EXP.workDate.test(string);
    const passDay = DAYS.includes(string.split(SEPARATOR)[1]);

    if (!(passFormat && passDay)) {
      throw new CustomError();
    }
  },
  validateNames(string) {
    const names = string.replaceAll(' ', '').split(SEPARATOR);

    const isSeparator =
      names.length === 1
        ? true
        : string.includes(SEPARATOR) &&
          names.length - 1 ===
            [...string].filter((v) => v === SEPARATOR).length;
    const isValidatedName = names.every((v) => REG_EXP.name.test(v));

    const isNotDuplicate = names.length === new Set(names).size;

    if (!(isSeparator && isValidatedName && isNotDuplicate)) {
      throw new CustomError();
    }
  },
  isValidatedNumberOfWorkers(names) {
    const { min, max } = NUMBER_OF_WORKER;
    const length = names.length;
    const pass = length >= min && length <= max;

    if (!pass) throw new CustomError();
  },
  // async get() {
  //   let result;
  //   while (!result) {
  //     try {
  //       const value = await InputView.get();
  //       result = this.validate(value);
  //     } catch (error) {
  //       const { message } = error;
  //       //print error
  //     }
  //   }
  //   return result;
  // },
  async getWorkDate() {
    let result;
    while (!result) {
      try {
        const value = await InputView.getValue(QUERY.workDate);
        //validate
        this.validateWorkDate(value);
        //set
        const [month, day] = value.split(SEPARATOR);
        result = { month: month, day: day };
      } catch (error) {
        const { message } = error;
        OutputView.print(message);
      }
    }
    return result;
  },
  async getWorker() {
    let result = {
      weekday: undefined,
      holiday: undefined,
    };
    while (!result.weekday || !result.holiday) {
      try {
        // 평일
        const weekdayNames = await InputView.getValue(QUERY.weekday);
        this.validateNames(weekdayNames);

        const weekday = weekdayNames.replaceAll(' ', '').split(SEPARATOR);

        this.isValidatedNumberOfWorkers(weekday);
        //휴일
        const holidayNames = await InputView.getValue(QUERY.holiday);

        this.validateNames(holidayNames);

        const holiday = holidayNames.replaceAll(' ', '').split(SEPARATOR);

        this.isValidatedNumberOfWorkers(holiday);

        //set
        result.weekday = weekday;
        result.holiday = holiday;
      } catch (error) {
        const { message } = error;
        OutputView.print(message);
      }
    }
    return result;
  },
};

export default InputController;
