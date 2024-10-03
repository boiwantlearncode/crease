# Crease

Crease is a responsive React component library powered by Tailwind CSS, designed to easily implement various types of interactive quizzes.

View the API Documentation at [crease.dev](https://www.crease.dev)

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Roadmap](#roadmap)
4. [How to contribute](#contribute)

## Installation <a name="installation"></a>

Install `@crease/react` with any one of the following commands:

```bash
npm i @crease/react
```

```bash
yarn add @crease/react
```

## Usage <a name="usage"></a>

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

## Roadmap <a name="roadmap"></a>
1. Additional props for `Quiz`: `className?`, `styles?`
Each receives an object that allows modification of 3 types within the quiz.

```ts
type className = {
  container: string;
  question: string;
  options: string;
}


type styles = {
  container: React.CSSProperties;
  question: React.CSSProperties;
  options: React.CSSProperties;
}
```

Examples of customization e.g. options are displayed in a straight column rather than 2x2.

2. New quiz format
-> "multiple-answers" 
-> "categorical"
-> "mixed" --> each question can be of any format

3. Templates (starter-kit) e.g. true-false
...
-> Callback function prop that accepts hook to allow retrieving of data (currentScore, results) from Quiz.
-> Analysis report in results page, and custom results page.
-> Support mixed types in question and options, e.g. an image as question or a mix of image and text as options.

## How to contribute <a name="contribute"></a>

Contributions are greatly welcomed! 😚
Currently, we do not have a contributing guide. 😞