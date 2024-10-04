import { FaRegCirclePlay } from "react-icons/fa6";

interface Lesson {
  title: string;
  url: string;
}

interface LessonsListProps {
  lessons: Lesson[];
  onLessonClick: (url: string) => void;
}

const LessonsList = ({ lessons, onLessonClick }: LessonsListProps) => {
  return (
    <div className="w-full lg:w-[30%] bg-base-200 px-5 pb-5 rounded-2xl overflow-auto">
      <div className="text-xl font-semibold py-5 sticky top-0 z-10 bg-base-200">
        <h4>Your Lessons</h4>
      </div>
      <div className="space-y-3">
        {lessons.map((lesson, index) => (
          <button
            key={index}
            className="btn btn-primary btn-outline justify-start flex items-center gap-2 p-2 rounded-xl w-full"
            onClick={() => onLessonClick(lesson.url)}
          >
            <FaRegCirclePlay /> <p>{lesson.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LessonsList;
