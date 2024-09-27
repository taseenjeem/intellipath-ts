const RefsTab = () => {
  return (
    <>
      <input
        type="radio"
        name="course_tabs"
        role="tab"
        className="tab"
        aria-label="References"
      />
      <div role="tabpanel" className="tab-content pt-5">
        Reference
      </div>
    </>
  );
};

export default RefsTab;
