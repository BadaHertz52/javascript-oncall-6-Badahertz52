import CustomError from '../CustomError.js';
import { NUMBER_OF_WORKER, REG_EXP, SEPARATOR } from '../constants/index.js';

class Workers {
  /**@type {string[]|undefined} */
  #names;

  constructor(string) {
    this.#setNames(string);
    this.#validateNames(string);
    this.#isValidatedNumberOfWorkers();
  }

  #setNames(string) {
    this.#names = string.replaceAll(' ', '').split(SEPARATOR);
  }
  //validate
  #isSeparator(string) {
    const length = this.#names.length;
    return (
      string.includes(SEPARATOR) &&
      length - 1 === [...string].filter((v) => v === SEPARATOR).length
    );
  }

  #isValidatedName() {
    return this.#names.every((v) => REG_EXP.name.test(v));
  }

  #isNotDuplicate() {
    return this.#names.length === new Set(this.#names).size;
  }

  #validateNames(string) {
    const pass =
      this.#isSeparator(string) &&
      this.#isValidatedName() &&
      this.#isNotDuplicate();

    if (!pass) {
      throw new CustomError();
    }
  }

  #isValidatedNumberOfWorkers() {
    const { min, max } = NUMBER_OF_WORKER;
    const length = this.#names.length;
    const pass = length >= min && length <= max;

    if (!pass) throw new CustomError();
  }

  getState() {
    return this.#names;
  }
}

export default Workers;
