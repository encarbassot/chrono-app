


import "./CreateNewChrono.css"

import ico_add from "../../assets/icons/actions/add.svg"
import ico_close from "../../assets/icons/actions/close.svg"
import { useEffect, useRef, useState } from "react"
import { useChrono } from "../../context/ChronoContext"

export default function CreateNewChrono({}){

  const { timers, addTimer } = useChrono()


  const [isOpen,setIsopen] = useState(false)

  const [inpName,setInpName] = useState("")
  const [inpColor,setInpColor] = useState("#293881")


  function createTimer(){
    addTimer(inpName || ("Timer-"+(timers.length+1)),inpColor)
    setInpName("")
    setInpColor("#293881")
    setIsopen(false)
  }

  return (
    <>
      <button className={"CreateNewChrono--button" + (isOpen ? " open":"")} onClick={()=>setIsopen(true)}> 
        <img src={ico_add} alt="" />
      </button>

      <div className={"CreateNewChrono" + (isOpen ? " open":"")}>
        <header>
          <h2>Create new chrono</h2>
          <button className="close" onClick={()=>setIsopen(false)}>
            <img src={ico_close} alt="" />
          </button>
        </header>
        <div className="form">

          <div className="input">
            <label>Name:</label>
            <input value={inpName} onChange={e=>setInpName(e.target.value)} type="text"  />
          </div>

          <div className="input">
            <label>Color:</label>
            <input value={inpColor} onChange={e=>setInpColor(e.target.value)} type="color" />
          </div>

        </div>
        <footer>
          <button className="button" onClick={createTimer}>Crear</button>
        </footer>
      </div>
    </>
  )
}