import { useEffect, useRef, useState } from 'react';
import shuffleArray from '../utils/shuffleArray';
import { Maximize2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

// Have to enforce correctAnswerIndex within the range and no duplicates in the options array
// Image embed (1), in future carousel so multiple in questions
// Timer (per question)
export type NonEmptyArray<T> = [T, ...T[]];

export type Content = {
  /** Sets the question */
  question: string;
  /** Sets the list of answer options for the question. */
  options: string[];
  /** The index of the correct answer within the options array. Must be an integer from `0` to `options.length - 1`. */
  correctAnswerIndex: number;
};

// Future versions, apply styling to 3 components of Content.
export type QuizProps = {
  /** Applies styling to the parent container. */
  style?: React.CSSProperties;
  /** Applies classes to the parent container. */
  className?: string;
  /** Sets the color scheme of component. */
  theme: "light" | "dark";
  /** (Optional) Whether to randomize the order of the questions. */
  shuffle?: boolean;
  /** 
   * Specifies the type of questions:
   * - `single-answer`: One correct answer from multiple choices.
   * - `multiple-answers`: Multiple correct answers.
   * - `categorical`: A personality-test style with categorical answers.
   */
  format: "single-answer" | "multiple-answers" | "categorical";
  /** 
   * Sets the content of the quiz:
   * - `question: string`
   * - `options: string[]`
   * - `correctAnswerIndex: number` - The index (0-based) of the correct answer within the `options` array.
   */
  content: [Content, ...Content[]];
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
export const Quiz = ({ style, className, theme, shuffle, content }: QuizProps): JSX.Element => {
  const totalQuestions: number = content.length;

  const defaultOptionsStyle: string = theme === "light" ? "bg-white border-gray-300 text-zinc-900 bg-opacity-10" : "bg-black border-gray-600 text-zinc-200 bg-opacity-10";

  const score = useRef(0);
  const buttonsRef = useRef<HTMLButtonElement[]>([]);
  const [finalContent, setFinalContent] = useState<Content[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [optionsStyle, setOptionsStyle] = useState<string[]>([]);

  useEffect(() => {
    setFinalContent(shuffle ? shuffleArray(content) : content);
  }, []);

  useEffect(() => {
    if (questionIndex < totalQuestions) {
      setOptionsStyle(Array(content[questionIndex].options.length).fill(defaultOptionsStyle));
    }
  }, [questionIndex]);

  const moveToNext = () => {
    buttonsRef.current.forEach(button => button.disabled = false);
    setQuestionIndex(questionIndex + 1);
  }

  const correctButton = (optionIndex: number) => {
    // setOptionsBgColors(optionsBgColors.map((color, index) => index === optionIndex ? "bg-green-500" : color));
    setOptionsStyle(optionsStyle.map((color, index) => index === optionIndex ? "bg-opacity-10 bg-green-700 border-green-700 hover:border-green-700 text-green-800" : color));
    buttonsRef.current.forEach(button => button.disabled = true);
  }

  const wrongButton = (optionIndex: number) => {
    // setOptionsBgColors(optionsBgColors.map((color, index) => index === optionIndex ? "bg-red-500" : color));
    setOptionsStyle(optionsStyle.map((color, index) => index === optionIndex ? "bg-opacity-10 bg-red-700 border-red-700 hover:border-red-700 text-red-700" : color));
    buttonsRef.current.forEach(button => button.disabled = true);
  }

  const checkAnswer = (optionIndex: number, correctAnswerIndex: number) => {
    if (optionIndex === correctAnswerIndex) {
      score.current++;
      correctButton(optionIndex);
    } else {
      wrongButton(optionIndex);
    }

    setTimeout(() => {
      moveToNext();
    }, 1000);
  }

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');


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
          <Results className={`dark:text-gray-200 text-gray-900`} score={score.current} totalQuestions={totalQuestions} />
        ) : (
          finalContent && finalContent.length > 0 && (
            <div className='flex flex-col h-full w-full gap-y-4'>
              <h2 onClick={() => expandText(finalContent[questionIndex].question)} className={`dark:text-gray-200 text-gray-900 group relative hover:cursor-pointer text-lg lg:text-2xl h-1/5 flex items-center justify-center font-semibold p-4`}>
                <span className='overflow-hidden overflow-ellipsis whitespace-nowrap'>{finalContent[questionIndex].question}</span>
                <Maximize2 size={16} className="absolute bottom-4 right-4 group-hover:scale-125 duration-200" />
                {/* <span className="flex items-center justify-center text-xs text-gray-700 group-hover:bg-gray-300 group-hover:scale-105 duration-200 border border-gray-700 rounded px-2 py-1 font-light absolute bottom-2 right-2">Expand text<Maximize2 size={12} strokeWidth={1.5} className='ml-2' /></span> */}
              </h2>
              {/* <h2 className={`${questionFontSize} ${themeFgColor} overflow-scroll flex items-center justify-center h-1/5 font-semibold p-4`}>{finalContent[questionIndex].question}</h2> */}
              <div className="flex flex-col flex-grow gap-2 lg:grid lg:grid-cols-2 lg:gap-4">
                {questionIndex < totalQuestions && finalContent[questionIndex].options.map((option, optionIndex) => (
                  <button 
                    ref={(btn) => {buttonsRef.current[optionIndex] = btn as HTMLButtonElement}} 
                    key={optionIndex} 
                    className={`${optionsStyle[optionIndex]} text-gray-950 text-md lg:text-lg w-full h-full flex-grow px-4 py-2 border rounded-lg`} 
                    onClick={() => checkAnswer(optionIndex, finalContent[questionIndex].correctAnswerIndex)}
                  >{option}</button>
                ))}
              </div>
              <p className={`dark:text-gray-200 text-gray-900 h-12 flex justify-center items-center`}>Score: {score.current}</p>
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