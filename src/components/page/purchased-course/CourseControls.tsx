import LessonsList from "./LessonsList";
import VideoPlayer from "./VideoPlayer";

const CourseControls = () => {
  return (
    <section className="flex gap-5 h-[calc(100vh-600px)] md:min-h-[calc(100vh-350px)]">
      <VideoPlayer />
      <LessonsList />
    </section>
  );
};

export default CourseControls;
