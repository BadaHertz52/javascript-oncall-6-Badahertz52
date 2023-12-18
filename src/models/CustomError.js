import { ERROR_MESSAGE } from '../constants/index.js';

class CustomError extends Error {
  constructor() {
    super(ERROR_MESSAGE);
  }
}

export default CustomError;
