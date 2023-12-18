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

  #getDays(){
    const {month, day} = this.#workDate;
    const numberOfDays = month === 2? 28: MONTH.thirty.includes(month)? 30 :31;
    const indexOfDay =DAYS.indexOf(day);
    const week = indexOfDay ? DAYS.slice(indexOfDay).concat(DAYS.slice(0, indexOfDay)) : DAYS;

    return  Array.from({length:numberOfDays +1 },(v,index)=>{
      const date = `${month<10? `0${month}`:month}${index+1<10? `0${index+1}`:index+1}`;
      const isPublicHoliday = RULE.holidays.includes(date);
      const day =week[Math.floor(index % 7)]
      return {
      isPublicHoliday : isPublicHoliday,
      day:day,
      date:index+1
    }});
  };
  #getSchedule(){
    const days = this.#getDays();
    const {weekday, holiday} = this.#worker;
    const workers ={
      weekday:Array.from({length:31},(v,index)=> weekday[index % weekday.length]),
      holiday:Array.from({length:15},(v,index)=> holiday[index % holiday.length]),
    };

    return days.map((v)=>{
      const isHoliday =["토","일"].includes(v.day) || v.isPublicHoliday;
      let worker;
      isHoliday ?
        worker =workers.holiday.shift():
        worker = workers.weekday.shift();
      
      return {
        ...v,
        worker:worker
      }
    })
  };
  #checkDuplicate(schedule){
    //const schedule = this.#getSchedule();
    schedule.forEach((v,index)=>{
      const previous =schedule[index -1];
      const next = schedule[index + 1];
      const isDuplicated = previous?.worker === v.worker;
      if(isDuplicated){
        const newItem ={...v, worker:next.worker};
        const newNext = {...next, worker:v.worker }
        schedule.splice(index,1, newItem);
        schedule.splice(index+1,1, newNext)
      }
    })
    return schedule;
  }
  #setSchedule(){
    const array = this.#getSchedule();
    this.#schedule = this.#checkDuplicate(array);
  }
  #print(){
    this.#schedule.map((v,index)=>{
      const date=`${this.#workDate.month}월 ${v.date}일 ${v.day}${v.isPublicHoliday&& !["토","일"].includes(v.day)?"(휴일)":""}`
      OutputView.print(`${date} ${v.worker}`)
    })
  }
}

export default App;
