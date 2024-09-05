import { PiStudentFill } from "react-icons/pi";
import UserAvatar from "./UserAvatar";
import ProfileInfoForm from "./ProfileInfoForm";

const ProfileInfoTab = () => {
  return (
    <>
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab whitespace-nowrap"
        aria-label="Profile Information"
        defaultChecked
      />
      <div role="tabpanel" className="tab-content w-full mt-5">
        <div className="mt-10 flex justify-center md:justify-start items-center md:gap-7 gap-4">
          <UserAvatar />
          <div className="md:space-y-2 space-y-1">
            <h2 className="md:text-2xl text-xl text-primary font-semibold">
              Md. Ta-Seen Fuad Jeem
            </h2>
            <h3 className="md:text-xl">@taseenjeem</h3>
            <div className="badge badge-primary badge-outline md:badge-lg">
              <PiStudentFill className="mr-1" /> <p>Student</p>
            </div>
          </div>
        </div>
        <ProfileInfoForm />
      </div>
    </>
  );
};

export default ProfileInfoTab;
