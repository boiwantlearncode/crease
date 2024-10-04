import React from 'react';
import './App.css'

import { Quiz, type MixedContent, type NonEmptyArray } from './components/Quiz'

const content: NonEmptyArray<MixedContent> = [
  {
    format: "multiple-answers",
    question: "How much wood could a woodchuck chuck if a woodchuck could chuck wood?",
    options: ["A", "B", "C", "D"],
    correctAnswers: [0, 1]
  },
  {
    format: "single-answer",
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswers: 0
  },
  {
    format: "single-answer",
    question: "What is the capital of Germany?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswers: 2
  },
  {
    format: "single-answer",
    question: "What is the capital of Spain?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswers: 3
  }
];

function App() {

  return (
    <div>
      <Quiz 
        theme='dark' 
        shuffle={true} 
        content={content}
      />
    </div>
  )
}

export default App
