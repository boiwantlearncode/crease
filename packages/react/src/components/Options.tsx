import { useEffect, useRef, useState } from "react";
import type { MixedContent } from "./Quiz";
import { twMerge } from "tailwind-merge";
import { ArrowRight } from "lucide-react";

type OptionsProps<T extends MixedContent> = {
  className?: string;
  options: string[];
  theme: "light" | "dark";
  content: T[];
  setScore: React.Dispatch<React.SetStateAction<number>>;
  score: number;
  setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  questionIndex: number;
};

// Work on twMerge
const Options = <T extends MixedContent>({ className, options, theme, content, setScore, score, setQuestionIndex, questionIndex }: OptionsProps<T>) => {
  const defaultOptionsStyle: string = theme === "light" ? "bg-white border-gray-300 text-zinc-900 bg-opacity-10" : "bg-black border-gray-600 text-zinc-200 bg-opacity-10";
  const correctAnswers = content[questionIndex].correctAnswers;
  const [checkedOptions, setCheckedOptions] = useState<number[]>([]);
  const format = content[questionIndex].format;

  const buttonsRef = useRef<HTMLButtonElement[] | HTMLInputElement[]>([]);
  const submitButtonRef = useRef<HTMLButtonElement>();
  const [optionsStyle, setOptionsStyle] = useState<string[]>(Array(content[questionIndex].options.length).fill(defaultOptionsStyle));

  const styleSelectedButtons = () => {
    setOptionsStyle(optionsStyle.map((_, index) => {
      if (checkedOptions.includes(index)) {
        return "bg-opacity-10 border-blue-700 text-zinc-200";
      }
      return defaultOptionsStyle;
    }));
  }

  const correctButton = (optionIndex: number) => {
    setOptionsStyle(prevOptionsStyle => 
      prevOptionsStyle.map((color, index) => 
        index === optionIndex 
          ? "bg-opacity-10 bg-green-700 border-green-700 hover:border-green-700 text-green-800"
          : color
      )
    );
  }

  const wrongButton = (optionIndex: number) => {
    setOptionsStyle(prevOptionsStyle => 
      prevOptionsStyle.map((color, index) => 
        index === optionIndex 
          ? "bg-opacity-10 bg-red-700 border-red-700 hover:border-red-700 text-red-700"
          : color
      )
    );
  }

  const disableButtons = () => {
    if (submitButtonRef.current) submitButtonRef.current.disabled = true;
    buttonsRef.current.forEach(button => button.disabled = true);
  }

  const moveToNext = () => {
    buttonsRef.current.forEach(button => button.disabled = false);
    setQuestionIndex(questionIndex + 1);
  }

  useEffect(() => {
    console.log(checkedOptions);
    styleSelectedButtons();
  }, [checkedOptions]);

  // Handle checkbox change
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const optionIndex = parseInt(value);

    setCheckedOptions((prevCheckedOptions) =>
      checked
        ? [...prevCheckedOptions, optionIndex] // Add the option if checked
        : prevCheckedOptions.filter((option) => option !== optionIndex) // Remove the option if unchecked
    );
  };

  const checkAnswer = (optionIndex?: number) => {
    console.log("Format: ", format);
    disableButtons();
    switch (format) {
      case "single-answer":
          if (optionIndex === correctAnswers as number) {
            setScore(score + 1);
            correctButton(optionIndex as number);
          } else {
            wrongButton(optionIndex as number);
          }
        break;
      case "multiple-answers":
        // To ask users: whether to show green if exact answers match or just show green for any correct answer
        if (checkedOptions.length === (correctAnswers as number[]).length && checkedOptions.sort().every((value, index) => value === (correctAnswers as number[]).sort()[index])) {
          setScore(score + 1);
          checkedOptions.forEach((index) => correctButton(index));
        } else {
          checkedOptions.forEach((index) => wrongButton(index));
        }
        break;
    }

    setTimeout(() => {
      moveToNext();
    }, 1000);
  }

  return (
    <div className="relative h-full w-full">
      <div 
        className={twMerge(
          "h-[calc(100%-48px)] bg-gren-500 w-full flex flex-col flex-grow gap-2 lg:grid lg:grid-cols-2 lg:gap-4",
          className
      )}>
        {options.map((option, optionIndex) => (
          format === "single-answer" ? (
            <button 
              ref={(btn) => {buttonsRef.current[optionIndex] = btn as HTMLButtonElement}} 
              key={optionIndex} 
              className={`${optionsStyle[optionIndex]} text-gray-950 text-md lg:text-lg w-full h-full flex-grow px-4 py-2 border rounded-lg`} 
              onClick={() => checkAnswer(optionIndex)}
            >{option}</button>
          ) : (
            format === "multiple-answers" ? (
              <label 
                key={optionIndex}
                className={`${optionsStyle[optionIndex]} flex items-center justify-center hover:cursor-pointer text-gray-950 text-md lg:text-lg w-full h-full flex-grow px-4 py-2 border rounded-lg`} 
              >
                <input
                  ref={(btn) => {buttonsRef.current[optionIndex] = btn as HTMLInputElement}} 
                  type="checkbox"
                  name="options"
                  value={optionIndex}
                  onChange={handleCheckboxChange}
                  className="hidden"
                />
                {option}
              </label>

            ) : (
              // ...to add more formats
              null
            )
          )
        ))}
      </div>
      {format === "multiple-answers" ? (
        <button
          ref={(btn) => {submitButtonRef.current = btn as HTMLButtonElement}}
          onClick={() => checkAnswer()}
          className="flex absolute bottom-0 right-0 items-center justify-center h-8 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Submit
          <ArrowRight className="w-4 h-4" />
        </button>
      ) : (
        null
      )}
    </div>
  );
}

export default Options;