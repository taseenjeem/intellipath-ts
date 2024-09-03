import CategoryList from "@/src/components/page/landing-page/CategoryList";
import Hero from "@/src/components/page/landing-page/Hero";
import TopCourses from "../components/page/landing-page/TopCourses";
import Testimonial from "../components/page/landing-page/Testimonial";
import Cta from "../components/page/landing-page/Cta";
import Partners from "../components/page/landing-page/Partnerts";

const LandingPage = () => {
  return (
    <>
      <Hero />
      <CategoryList />
      <TopCourses />
      <Testimonial />
      <Cta />
      <Partners />
    </>
  );
};

export default LandingPage;
