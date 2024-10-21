import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CreateNewChrono from './components/CreateNewChrono/CreateNewChrono'
import TimersList from './components/TimersList/TimersList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <CreateNewChrono/>

        <TimersList/>
      </div>
    </>
  )
}

export default App
