# Crease

Crease is a responsive React component library powered by Tailwind CSS, designed to easily implement various types of interactive quizzes.

View the full documentation at [crease.dev](https://www.crease.dev)

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
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

```tsx
import { Quiz } from '@crease/react';
import type { Content, NonEmptyArray } from '@crease/react';

const content: NonEmptyArray<Content> = [
  {
    question: "What is 1 + 1?",
    options: [
      "2",
      "4",
      "1",
      "0"
    ],
    correctAnswerIndex: 0 // Index of the correct answer within the options array.
  }
]

function App() {
  return (
    <Quiz
        theme='dark' 
        shuffle={true} 
        format='single-answer'
        content={content}
    />
  )
}
```

## How to contribute <a name="contribute"></a>

Contributions are greatly welcomed! 😚

Currently, we do not have a contributing guide. 😞