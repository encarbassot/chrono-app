


import { useChrono } from "../../context/ChronoContext"
import "./TimersList.css"



export default function TimersList(){

  const { timers, addTimer } = useChrono()




  return (
    <div className="TimersList">

      {timers.map(({name,color})=>{

        return(
          <p style={{background:color}}>{name}</p>
        )
      })}

    </div>
  )
}