import ProfileInfoForm from "./ProfileInfoForm";

interface ISettingsInfoFormProps {
  userId: string;
  userEmail: string;
}

const SettingsTab = ({ userId, userEmail }: ISettingsInfoFormProps) => {
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
        <div className="card card-body bg-base-300">
          <ProfileInfoForm userId={userId} userEmail={userEmail} />
        </div>
      </div>
    </>
  );
};

export default SettingsTab;
