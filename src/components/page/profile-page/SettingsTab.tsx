const SettingsTab = () => {
  return (
    <>
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab whitespace-nowrap"
        aria-label="Settings"
      />
      <div role="tabpanel" className="tab-content mt-5">
        <div className="card card-body bg-base-300"></div>
      </div>
    </>
  );
};

export default SettingsTab;
