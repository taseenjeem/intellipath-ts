import CategoryList from "@/src/components/page/landing-page/CategoryList";
import Hero from "@/src/components/page/landing-page/Hero";
import TopCourses from "@/src/components/page/landing-page/TopCourses";
import Testimonial from "@/src/components/page/landing-page/Testimonial";
import Cta from "@/src/components/page/landing-page/Cta";
import Partners from "@/src/components/page/landing-page/Partnerts";

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
