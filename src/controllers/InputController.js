import CustomError from '../CustomError.js';
import { DAYS, QUERY, REG_EXP, SEPARATOR } from '../constants/index.js';
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
};

export default InputController;
