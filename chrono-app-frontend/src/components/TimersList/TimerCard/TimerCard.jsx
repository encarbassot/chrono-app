
import ico_play from "../../../assets/icons/actions/play.svg"
import ico_pause from "../../../assets/icons/actions/pause.svg"
import { useEffect, useState } from "react"
import { useChrono } from "../../../context/ChronoContext"
import  "./TimerCard.css"
import { formatDuration } from "../../../models/Chrono"

export default function TimerCard({timer,index}){

  const {getTotalTimeForTimer,addTimestampToTimer} = useChrono()

  const {name,color,addTimestamp,calculateTotalTime,isRunning} = timer

  const [currentTotalTime, setCurrentTotalTime] = useState(getTotalTimeForTimer(index))


  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setCurrentTotalTime(getTotalTimeForTimer(index))
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isRunning, index, getTotalTimeForTimer])



  return <div className="TimerCard">
    
    <header style={{backgroundColor:color.hex}}>
      <h2 style={{color:color.getContrastColor().hex}}>{name}</h2>
    </header>

    <div className="content">

      <div className="main">
        <h2>{currentTotalTime === 0 ? "Start the timer" : formatDuration(currentTotalTime)}</h2>

      </div>

      <footer>
        <button onClick={()=>addTimestampToTimer(index)}>
          <img src={ isRunning ? ico_pause : ico_play} alt="" />
        </button>
      </footer>
    </div>
  </div>
}