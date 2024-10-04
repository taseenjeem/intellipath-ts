const DescriptionTab = ({ description }: { description: string }) => {
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
      <div role="tabpanel" className="tab-content pt-5 min-h-[60vh]">
        {description}
      </div>
    </>
  );
};

export default DescriptionTab;
