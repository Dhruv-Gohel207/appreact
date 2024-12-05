import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar.jsx/Navbar'
import { increment,decrement, multiply } from './redux/counter/counterSlice'
import { useSelector, useDispatch } from 'react-redux'

function App() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  return (
    <>
      <Navbar/>
      <div>
          
          <button style={{margin:"10px"}}  onClick={()=>{dispatch(decrement())}}>-</button>
          Currently Count is:- {count}
          <button style={{margin:"10px"}} onClick={()=>{dispatch(increment())}}>+</button>
          <button style={{margin:"10px"}} onClick={()=>{dispatch(multiply())}}>*</button>
      </div>
    </>
  )
}

export default App
