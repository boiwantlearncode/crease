import { Maximize2 } from "lucide-react";
import { twMerge } from "tailwind-merge";

type QuestionProps = {
  className?: string;
  question: string;
  expandText: (content: string) => void;
};

const Question = ({ className, question, expandText }: QuestionProps) => (
  <h2 
    onClick={() => expandText(question)} 
    className={twMerge(
      'dark:text-gray-200 text-gray-900 group relative hover:cursor-pointer text-lg lg:text-2xl h-1/5 flex items-center justify-center font-semibold p-4',
      className
    )}>
    <span className='overflow-hidden overflow-ellipsis whitespace-nowrap'>{question}</span>
    <Maximize2 size={16} className="absolute bottom-4 right-4 group-hover:scale-125 duration-200" />
  </h2>
);

export default Question;