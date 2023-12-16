import { DAYS, MONTH, RULE } from "./constants/Rule.js";
import {InputController} from "./controllers/index.js";
import OutputView from "./views/OutputView.js";

class App {
  #workDate ={
    month:1,
    day:'월'
  }
  #worker ={
    weekday: [],
    holiday: [],
  }
  #schedule ;
  async run() {
    await this.#getWorkDate();
    await this.#getWorker();
    this.#setSchedule();
    this.#print();
  }
  async #getWorkDate(){
    this.#workDate = await InputController.getWorkDate();
  }

  async #getWorker(){
    this.#worker = await InputController.getWorker();
  }

  #changeIndex(workers){
    // 순서 교환
    workers.forEach( (worker, index) => {
      const previous = workers[index-1];
      if(previous === worker) {
        workers.splice(index,1); workers.splice(index+1,0,worker)};
    });

  return workers;

  }
  #getWorkerArray(){
    const {weekday, holiday} = this.#worker;
    const {day} = this.#workDate;
    const isWeekend = ["토","일"].includes(day);
    const workers ={
      weekday:Array.from({length:31},(v,index)=> weekday[index % weekday.length]),
      holiday:Array.from({length:15},(v,index)=> holiday[index % holiday.length]),
    };
    let startIndex= {
      weekday:0,
      holiday:0
    };
    let array=[];

    if(isWeekend) {
      const index = day ==="토"? 1: 0
      array = workers.holiday.slice(0, index +1 ); 
      startIndex.holiday = index  + 1;
    };

    while(array.length <=32 ){
      array = array.concat(workers.weekday.slice(startIndex.weekday, startIndex.weekday+5));
      array= array.concat(workers.holiday.slice(startIndex.holiday, startIndex.holiday +2));
      startIndex.weekday +=  5;
      startIndex.holiday += + 2 ;

    };
    return array;
  }
  #setSchedule(){
    const {month,day} = this.#workDate;
    const totalDays = month===2 ? 28: MONTH.thirty.includes(month)? 30 :31;
    const workers = this.#changeIndex (this.#getWorkerArray()).slice(0, totalDays+1);
    const indexOfDay = DAYS.indexOf(day);
    const week = indexOfDay ? DAYS.slice(indexOfDay).concat(DAYS.slice(0, indexOfDay)) : DAYS;

    const schedule = workers.map((worker,index)=>{
      const date = `${month<10? `0${month}`:month}${index<10? `0${index}`:index}`;
      const isPublicHoliday = RULE.holidays.includes(date);

      return {
        name:worker,
        date :`${month}월 ${index+1}일 ${week[Math.floor(index % 7)]}${isPublicHoliday?'(휴일)':''}`
      }
    });
    this.#schedule = schedule;
  };
  #print(){
    this.#schedule.map((v)=>{
      OutputView.print(`${v.date} ${v.name}`)
    })
  }
}

export default App;
