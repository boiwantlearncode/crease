import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Quiz } from '@crease/react'
import type { Content, NonEmptyArray } from '@crease/react'

const content: NonEmptyArray<Content> = [
  {
    question: "How much wood could a woodchuck chuck if a woodchuck could chuck wood?",
    options: ["A", "B", "C", "D"],
    correctAnswerIndex: 2
  },
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswerIndex: 0
  },
  {
    question: "What is the capital of Germany?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswerIndex: 2
  },
  {
    question: "What is the capital of Spain?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswerIndex: 3
  }
]

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Quiz theme={'light'} shuffle={false} format='single-answer' content={content} />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
