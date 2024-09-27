import AddReview from "./AddReview";
import ReviewCard from "./ReviewCard";

const ReviewTab = () => {
  return (
    <>
      <input
        type="radio"
        name="course_tabs"
        role="tab"
        className="tab"
        aria-label="Reviews"
      />
      <div role="tabpanel" className="tab-content pt-5 min-h-[60vh]">
        <div className="w-full h-[500px] border-2 border-gray-500 overflow-hidden overflow-y-auto rounded-2xl p-5 space-y-3">
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>
        <AddReview />
      </div>
    </>
  );
};

export default ReviewTab;
