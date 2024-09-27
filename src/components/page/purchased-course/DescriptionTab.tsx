const DescriptionTab = () => {
  return (
    <>
      <input
        type="radio"
        name="course_tabs"
        role="tab"
        className="tab"
        aria-label="Descriptions"
        defaultChecked
      />
      <div role="tabpanel" className="tab-content pt-5">
        lorem200
      </div>
    </>
  );
};

export default DescriptionTab;
