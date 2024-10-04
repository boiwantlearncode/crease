import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import shuffleArray from '../utils/shuffleArray';
import Question from './Question';
import Options from './Options';

// Have to enforce correctAnswerIndex within the range and no duplicates in the options array
// Image embed (1), in future carousel so multiple in questions
// Timer (per question)
export type NonEmptyArray<T extends MixedContent> = [T, ...T[]];

export type SingleAnswerContent = {
  /** Specifies the question format */
  format: "single-answer";
  /** Sets the question */
  question: string;
  /** Sets the list of answer options for the question. */
  options: string[];
  /** The index of the correct answer within the options array. Must be an integer from `0` to `options.length - 1`. */
  correctAnswers: number;
}

export type MultipleAnswersContent = {
  /** Specifies the question format */
  format: "multiple-answers";
  /** Sets the question */
  question: string;
  /** Sets the list of answer options for the question. */
  options: string[];
  /** The index of the correct answer within the options array. Must be an integer from `0` to `options.length - 1`. */
  correctAnswers: number[];
}

export type MixedContent = SingleAnswerContent | MultipleAnswersContent;

// Future versions, apply styling to 3 components of Content.
export type QuizProps<T extends MixedContent> = {
  /** 
   * Sets the content of the quiz:
   * - `format: "single-answer" | "multiple-answers"`
   * - `question: string`
   * - `options: string[]`
   * - `correctAnswerIndex: number | number[]` - The index (0-based) of the correct answer(s) within the `options` array.
   */
  content: NonEmptyArray<T>;
  /** Applies classes to the parent container. */
  className?: string;
  /** Applies styling to the parent container. */
  style?: React.CSSProperties;
  /** Sets the color scheme of component. */
  theme: "light" | "dark";
  /** (Optional) Whether to randomize the order of the questions. */
  shuffle?: boolean;
};

type ResultsProps = {
  className?: string;
  score: number;
  totalQuestions: number;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  content: string;
}

/**
 * Quiz component renders a quiz with various configurations like size, theme, and optional shuffle option.
 */
export const Quiz = <T extends MixedContent>({ style, className, theme, shuffle, content }: QuizProps<T>): JSX.Element => {
  const totalQuestions: number = content.length;
  
  const [score, setScore] = useState<number>(0);
  const [shuffledContent, setShuffledContent] = useState<MixedContent[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');

  useEffect(() => {
    setShuffledContent(shuffle ? shuffleArray(content) : content);
  }, []);

  const expandText = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`} >
      <div 
        className={twMerge(
          'w-[calc(90vw)] h-[calc(90vh)] lg:w-default lg:h-default rounded-md flex-col py-4 px-6 dark:bg-gray-950 bg-gray-200',
          className
        )}
        style={style}
      >
        {questionIndex === totalQuestions ? (
          <Results className={`dark:text-gray-200 text-gray-900`} score={score} totalQuestions={totalQuestions} />
        ) : (
          shuffledContent && shuffledContent.length > 0 && (
            <div className='flex flex-col h-full w-full gap-y-4'>
              <Question question={shuffledContent[questionIndex].question} expandText={expandText} />
              {questionIndex < totalQuestions
                && <Options 
                    key={questionIndex}
                    options={shuffledContent[questionIndex].options} 
                    content={shuffledContent} 
                    theme={theme}
                    setScore={setScore}
                    score={score} 
                    setQuestionIndex={setQuestionIndex} 
                    questionIndex={questionIndex} 
                  />
              } 
              <p className={`dark:text-gray-200 text-gray-900 h-12 flex justify-center items-center`}>Score: {score}</p>
            </div>
          )
        )}
        <Modal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
      </div>

    </div>
  );
}

const Results = ({className, score, totalQuestions}: ResultsProps): JSX.Element => {
  return (
    <div className={`${className} w-full h-full flex items-center justify-center`}>
      <h1 className='text-2xl p-4 rounded-md'>You got <span className='italic font-medium'>{score} of {totalQuestions}</span> questions correct.</h1>
    </div>
  )
}

const Modal = ({ isOpen, onClose, content }: ModalProps): JSX.Element | null => {
  if (!isOpen) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="dark:bg-gray-900 bg-white p-4 rounded-md max-w-lg w-[calc(90vw)] lg:w-full">
        <p className='dark:text-gray-100 text-gray-900'>{content}</p>
      </div>
    </div>
  );
}


