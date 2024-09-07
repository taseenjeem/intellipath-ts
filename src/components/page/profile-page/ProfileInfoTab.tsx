"use client";
import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import UserAvatar from "./UserAvatar";
import ProfileInfoForm from "./ProfileInfoForm";
import { useAppSelector } from "@/redux/store";

const ProfileInfoTab = () => {
  const userData = useAppSelector((state) => state.userInfo);

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
        <div className="lg:flex lg:items-start">
          <div className="mt-10 flex justify-start items-center md:gap-7 gap-4 lg:w-1/2">
            <UserAvatar
              profileImageUrl={userData?.profileImageUrl ?? null}
              userId={userData?._id}
              userEmail={userData?.email}
            />
            <div>
              <h2 className="md:text-2xl text-xl text-primary font-semibold">
                {userData?.fullName}
              </h2>
              <h3 className="md:text-xl">@{userData?.username}</h3>
              <div className="badge badge-primary badge-outline md:badge-lg mt-2">
                {userData?.role === "learner" && (
                  <PiStudentFill className="mr-1" />
                )}
                {userData?.role === "instructor" && (
                  <FaChalkboardTeacher className="mr-1" />
                )}
                <p className="capitalize">{userData?.role}</p>
              </div>
            </div>
          </div>
          <ProfileInfoForm userId={userData?._id} userEmail={userData?.email} />
        </div>
      </div>
    </>
  );
};

export default ProfileInfoTab;
