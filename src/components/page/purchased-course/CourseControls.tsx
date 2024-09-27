import DescriptionTab from "./DescriptionTab";
import LessonsList from "./LessonsList";
import RefsTab from "./RefsTab";
import ReviewTab from "./ReviewTab";
import VideoPlayer from "./VideoPlayer";

const CourseControls = () => {
  return (
    <>
      <section className="flex flex-col lg:flex-row gap-5 aspect-1 lg:aspect-3">
        <VideoPlayer />
        <LessonsList />
      </section>
      <div role="tablist" className="tabs tabs-bordered mt-5">
        <DescriptionTab />
        <RefsTab />
        <ReviewTab />
      </div>
    </>
  );
};

export default CourseControls;
