import { createContext, useContext, useEffect, useState } from 'react'
import Chrono from '../models/Chrono'

// Create the context
const ChronoContext = createContext()

// Create a provider component
export function ChronoProvider({ children }) {

  const [timers, setTimers] =  useState(() => {
    const savedTimers = localStorage.getItem('chronoTimers')
    if (savedTimers) {
      const parsedTimers = JSON.parse(savedTimers)
      // Deserialize the stored objects into Chrono instances
      return parsedTimers.map(timer => Chrono.fromJSON(timer))
    }
    return []
  })
  
  const addTimer = (name, color) => {
    const newTimer = new Chrono(name, color)
    const updatedTimers = [...timers, newTimer]
    setTimers(updatedTimers)
  }


  const addTimestampToTimer = (index) => {
    setTimers(prevTimers => {
      const updatedTimers = [...prevTimers] // Create a copy of the timers array
      updatedTimers[index].addTimestamp() // Call method on the copied object
      return updatedTimers
    })
  }

  const getTotalTimeForTimer = (index) => {
    if (index >= 0 && index < timers.length) {
      return timers[index].calculateTotalTime() // Call the method to calculate total time
    }
    return 0 // Return 0 if the index is out of bounds
  }

  useEffect(() => {
    // Serialize each Chrono instance to a plain object before saving
    const serializedTimers = timers.map(timer => timer.toJSON())
    localStorage.setItem('chronoTimers', JSON.stringify(serializedTimers))
  }, [timers])

  return (
    <ChronoContext.Provider value={
      {
        timers,
        addTimer,
        addTimestampToTimer,
        getTotalTimeForTimer
      }
    }>
      {children}
    </ChronoContext.Provider>
  )
}

// Custom hook for using the context
export function useChrono() {
  return useContext(ChronoContext)
}
