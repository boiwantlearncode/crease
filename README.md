# Crease

<video playsinline muted autoplay loop >
  <source src="./introduction.mp4" type="video/mp4">
</video>
<!-- <video width="480" playsinline muted autoplay loop >
</video> -->

Crease is a responsive React component library powered by Tailwind CSS, designed to easily implement various types of interactive quizzes.

View the full documentation at [crease.dev](https://www.crease.dev)

## Table of Contents

1. [Installation](#installation)
2. [Basic usage](#usage)
3. [How to contribute](#contribute)

## Installation <a name="installation"></a>

Install `@crease/react` with any one of the following commands:

```bash
npm i @crease/react
```

```bash
yarn add @crease/react
```

## Basic usage <a name="usage"></a>

Import the Quiz component

```tsx title="App.tsx"
import { Quiz } from '@crease/react';
import type { MixedContent, NonEmptyArray } from '@crease/react';

const content: NonEmptyArray<MixedContent> = [
  {
    format: "single-answer",
    question: "Is 1+1=2?",
    options: [
      "True",
      "False"
    ],
    correctAnswers: 0 // Index of the correct answer within the options array.
  },    
  {
    format: "single-answer",
    question: "Are there more atoms in the universe than pigeons?",
    options: [
      "True",
      "False"
    ],
    correctAnswers: 0
  },
  {
    format: "multiple-answers",
    question: "Which of these are prime numbers?",
    options: ["-2", "7", "3", "1"],
    correctAnswers: [1, 2] // has to be an array of indexes for "multiple-answers" format
  }
]

function App() {
  return (
    <Quiz
      theme='dark' 
      shuffle={true} // Order of questions displayed will be random
      content={content}
    />
  )
}
```

## How to contribute <a name="contribute"></a>

Contributions are greatly welcomed! 😚

Currently, we do not have a contributing guide. 😞