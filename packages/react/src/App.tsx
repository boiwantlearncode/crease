import './App.css'

import { Quiz, type Content, type NonEmptyArray } from './components/Quiz'

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
];

function App() {

  return (
    <div>
      <Quiz 
        theme='light' 
        shuffle={true} 
        format='single-answer'
        content={content}
      />
    </div>
  )
}

export default App
