import {InputController} from "./controllers/index.js";

class App {
  #workDate ={
    month:1,
    day:'월'
  }
  async run() {
    await this.#getWorkDate();
  }
  async #getWorkDate(){
    this.#workDate = await InputController.getWorkDate();
  }
}

export default App;
