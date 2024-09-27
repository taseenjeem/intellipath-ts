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
      <div role="tabpanel" className="tab-content pt-5">
        Reviews
      </div>
    </>
  );
};

export default ReviewTab;
