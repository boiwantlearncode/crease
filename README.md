# Crease

Crease is a responsive React component library powered by Tailwind CSS, designed to easily implement various types of interactive quizzes.

Current formats available:
- [x] Single Answer
- [ ] Multiple Answers
- [ ] Categorical (Personality Quiz)
- [ ] ...

1. Installation
2. Usage
3. API Documentation
4. Roadmap
5. How to contribute

## Installation

Install `@carbon/react` with any one of the following commands:

```bash
npm i @crease/react
```

```bash
yarn add @crease/react
```

## Usage

Import the Quiz component

```tsx
import { Quiz } from '@crease/react';
import type { Content } from '@crease/react';

const content: Content[] = [
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

## API Documentation

Refer to documentation at [API Documentation](https://crease.github.io)

## Roadmap
(1) Additional props for `Quiz`: `className?`, `styles?`
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

(2) New quiz format
-> "multiple-answers" 
-> "categorical"
-> "mixed" --> each question can be of any format

(3) Templates (starter-kit) e.g. true-false
...
-> Callback function prop that accepts hook to allow retrieving of data (currentScore, results) from Quiz.
-> Analysis report in results page, and custom results page.
-> Support mixed types in question and options, e.g. an image as question or a mix of image and text as options.

/**
THE LOGIC:
1. make it such that only the particular elements selected will have their styles changed
.. meaning that even if we have styles/className, the default will be kept and not totally overridden
.. (a) this requires !important modifier
.. (b) other method is using .replace() to replace existing css property e.g. replace width or height. this 
.... is optimized and has no redundancy. the issue is that it will take time in performing the .replace()
.... function

*/



## How to contribute

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/CONTRIBUTING.md)! 