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
  #getArray(start, number, array){
    const length = array.length;
    const last =  start + number -1 ;
    const isOver =last >= length;
    const lastIndex= isOver? number - (length  - start) -1 : last ;
    
    const newArray = isOver?   [...array].slice(start).concat([...array].slice(0, lastIndex +1 )) : [...array].slice(start, last+1)
    return {
      array:newArray,
      lastIndex:lastIndex
    } 
  }
  #changeIndex(workers ,totalDays){
    // 순서 교환
    let array =[];
    for (let i=0; array.length < totalDays; 
      i++) {
      const index = i;
      const worker = workers[index] ;
      const previous =array[index-1];
      const isDuplicate = previous  ? previous === worker :false;
      !isDuplicate?
        array.push(worker):
      array.concat([workers[index+1], worker]);

      if(isDuplicate) i +=1;

    }
    return array
  }
  #getWorkerArray(totalDays){
    const {weekday , holiday} = this.#worker;

    let workers =[];
    let weekdayLastIndex=0;
    let holidayLastIndex=0;

    while (true) {
      const weekend =this.#workDate.day === "토"||this.#workDate.day === "일";
      if(weekend){
        const indexOf =DAYS.indexOf(this.#workDate.day);
        workers.push(holiday[0]);
        holidayLastIndex =0;
        if(indexOf ) workers.push(holiday[1]);
        holidayLastIndex =1;
      };
      
        const weekdayWorkers = this.#getArray(weekdayLastIndex? weekdayLastIndex+1: weekdayLastIndex,5, weekday);

        workers = workers.concat(weekdayWorkers.array);
        weekdayLastIndex = weekdayWorkers.lastIndex;
        const next = weekend && !holidayLastIndex ? 1: holidayLastIndex +1;

        const holidayWorkers =this.#getArray(next ,2,holiday);
     
        workers = workers.concat(holidayWorkers.array);
        holidayLastIndex = holidayWorkers.lastIndex;
      
      if(workers.length >= totalDays+ 8
        ) break;
    };

    return workers
    //[...workers].slice(DAYS.indexOf(this.#workDate.day))
  }
  #setSchedule(){
    const {month,day} = this.#workDate;
    const totalDays = month===2 ? 28: MONTH.thirty.includes(month)? 30 :31;
    const workers = this.#changeIndex (this.#getWorkerArray(totalDays),totalDays);
    const indexOfDay = DAYS.indexOf(day);
    const week = indexOfDay ? [...DAYS].slice(indexOfDay).concat([...DAYS].slice(0,indexOfDay)) :DAYS;
  
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
