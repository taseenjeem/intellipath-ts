import PublishCoursePageMain from "@/src/components/page/publish-a-new-course-page/PublishCoursePageMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publish a New Course - Intellipath",
  description:
    "IntelliPath is a cutting-edge online education platform designed to empower learners of all ages with personalized and engaging learning experiences. Our platform offers a vast array of courses across various disciplines, utilizing advanced technology to tailor learning paths that suit individual needs and goals. Whether you're looking to advance your career, develop new skills, or explore new interests, IntelliPath provides the tools and support to help you succeed.",
};

const PublishCoursePage = () => {
  return <PublishCoursePageMain />;
};

export default PublishCoursePage;
