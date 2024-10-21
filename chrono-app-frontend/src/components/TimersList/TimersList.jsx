


import { useChrono } from "../../context/ChronoContext"
import TimerCard from "./TimerCard/TimerCard"
import "./TimersList.css"



export default function TimersList(){

  const { timers, addTimer } = useChrono()




  return (
    <div className="TimersList">

      <div className="TimersListContent">

        {timers.map((timer,i)=>{

          return(
            // <div className="TimerCard" style={{background:color}}>{name}</div>
            <TimerCard key={i} timer={timer} index={i}/>
          )
        })}
      </div>


    </div>
  )
}