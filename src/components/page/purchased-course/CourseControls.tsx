"use client";
import { ICourse } from "@/types";
import DescriptionTab from "./DescriptionTab";
import LessonsList from "./LessonsList";
import ReviewTab from "./ReviewTab";
import VideoPlayer from "./VideoPlayer";
import { useState } from "react";

const CourseControls = ({
  courseData,
  username,
}: {
  courseData: ICourse;
  username: string;
}) => {
  const [selectedLessonUrl, setSelectedLessonUrl] = useState<string>(
    courseData.lessons[0]?.url
  );

  const handleLessonClick = (url: string) => {
    setSelectedLessonUrl(url);
  };

  return (
    <>
      <section className="flex flex-col lg:flex-row gap-5 aspect-1 lg:aspect-3">
        <VideoPlayer url={selectedLessonUrl} />
        <LessonsList
          lessons={courseData.lessons}
          onLessonClick={handleLessonClick}
          selectedLessonUrl={selectedLessonUrl}
        />
      </section>
      <div role="tablist" className="tabs tabs-bordered lg:tabs-lg mt-5">
        <DescriptionTab description={courseData.full_description} />
        <ReviewTab courseId={courseData._id ?? ""} username={username} />
      </div>
    </>
  );
};

export default CourseControls;
