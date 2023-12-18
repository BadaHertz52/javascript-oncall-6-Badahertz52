import { PUBLIC_HOLIDAY } from "./constants/index.js";
import {InputController} from "./controllers/index.js";
import {Schedule} from './models/index.js'
import {OutputView} from "./views/index.js";

class App {
  #calendar;
  #workers ={
    weekday: [],
    holiday: [],
  }
  #schedule ;

  async run() {
    await this.#getCalendar();
    await this.#getWorkers();
    this.#setSchedule();
    this.#print();
  }

  async #getCalendar(){
    this.#calendar= await InputController.getCalendar();
  }

  async #getWorkers(){
    this.#workers = await InputController.getWorkers();
  }
  
  #setSchedule(){
    this.#schedule = new Schedule(this.#calendar, this.#workers).getSchedule();
  }
  
  #print(){
    this.#schedule.map((v)=>{
      const {month, date, day, isPublicHoliday, isWeekend , worker} =v;
      const dateMessage=`${month}월 ${date}일 ${day}${isPublicHoliday && !isWeekend? PUBLIC_HOLIDAY:""}`

      OutputView.print(`${dateMessage} ${worker}`)
    })
  }
}

export default App;
