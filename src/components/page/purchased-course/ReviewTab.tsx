import AddReviewForm from "./AddReview";

const ReviewTab = ({ courseId }: { courseId: string }) => {
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
        <AddReviewForm courseId={courseId} />
      </div>
    </>
  );
};

export default ReviewTab;
