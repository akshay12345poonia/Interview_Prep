import { useState } from 'react'
import PostList from "./components/PostList";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <PostList />

    </div>
  )
}

export default App
