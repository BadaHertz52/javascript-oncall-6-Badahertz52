import {InputController} from "./controllers/index.js";

class App {
  #workDate ={
    month:1,
    day:'월'
  }
  #worker ={
    weekday: [],
    holiday: [],
  }
  async run() {
    await this.#getWorkDate();
    await this.#getWorker();
  }
  async #getWorkDate(){
    this.#workDate = await InputController.getWorkDate();
  }

  async #getWorker(){
    this.#worker = await InputController.getWorker();
  }
}

export default App;
