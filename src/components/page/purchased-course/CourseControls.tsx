import LessonsList from "./LessonsList";
import VideoPlayer from "./VideoPlayer";

const CourseControls = () => {
  return (
    <section className="flex flex-col lg:flex-row gap-5 aspect-1 lg:aspect-3">
      <VideoPlayer />
      <LessonsList />
    </section>
  );
};

export default CourseControls;
