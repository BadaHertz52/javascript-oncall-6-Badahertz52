import { Console } from '@woowacourse/mission-utils';

const InputView = {
  async getValue(query) {
    const value = await Console.readLineAsync(`\n${query}\n`);
    return value;
  },
};
export default InputView;
