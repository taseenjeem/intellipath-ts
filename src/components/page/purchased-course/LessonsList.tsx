import { FaRegCirclePlay } from "react-icons/fa6";

const LessonsList = () => {
  return (
    <div className="w-full lg:w-[30%] bg-base-200 px-5 pb-5 rounded-2xl overflow-auto">
      <div className="text-xl font-semibold py-5 sticky top-0 z-10 bg-base-200">
        <h4>Your Lessons</h4>
      </div>
      <div className="space-y-3">
        <div className="collapse collapse-arrow bg-base-300">
          <input type="checkbox" />
          <div className="collapse-title text-lg font-medium">
            Click me to show/hide content
          </div>
          <div className="collapse-content">
            <button className="btn btn-primary btn-outline justify-start flex items-center gap-2 p-2 rounded-xl w-full">
              <FaRegCirclePlay /> <p>Lorem ipsum dolor sit amet </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonsList;
