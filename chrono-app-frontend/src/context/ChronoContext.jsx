import { createContext, useContext, useState } from 'react'

// Create the context
const ChronoContext = createContext()

// Create a provider component
export function ChronoProvider({ children }) {
  const [timers, setTimers] = useState([])

  // Example of adding a new timer (you can extend this later)
  const addTimer = (name,color) => {
    const timer = {
      name,
      color,
      timestamps:[]
    }
    setTimers([...timers, timer])
  }


  return (
    <ChronoContext.Provider value={
      {
        timers,
        addTimer
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
