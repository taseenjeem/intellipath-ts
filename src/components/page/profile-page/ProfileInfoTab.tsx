import { IUserInfo } from "@/types";
import { formatDate } from "@/utils/dateFormatter";
import Image from "next/image";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";

interface IProfileInfoTabProps {
  userData: IUserInfo | null;
}

const ProfileInfoTab = ({ userData }: IProfileInfoTabProps) => {
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
        <div className="mt-12">
          <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-5">
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 size-44 rounded-full ring ring-offset-2">
                <Image
                  width={128}
                  height={128}
                  src={
                    userData?.profileImageUrl
                      ? userData.profileImageUrl
                      : "/assets/images/profile-placeholder.jpg"
                  }
                  alt="Profile"
                />
              </div>
            </div>
            <div className="text-center md:text-start">
              <h3 className="text-4xl font-semibold text-primary">
                {userData?.fullName}
              </h3>
              <h4 className="text-lg">@{userData?.username}</h4>
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
          {userData?.biography && (
            <div className="mt-10 space-y-3">
              <h3 className="text-2xl font-bold text-primary underline underline-offset-4">
                About {userData?.fullName}
              </h3>
              <p>{userData?.biography}</p>
            </div>
          )}
        </div>
        <hr className="md:my-10 my-5" />
        <div className="grid grid-cols-1 gap-5 md:gap-0 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold text-primary underline underline-offset-4">
              Personal Information
            </h3>
            <div className="mt-2">
              <ul className="space-y-1">
                <li>
                  <strong>First Name:</strong> {userData?.firstName}
                </li>
                <li>
                  <strong>Last Name:</strong> {userData?.lastName}
                </li>
                <li>
                  <strong>Gender:</strong>{" "}
                  {userData?.gender ? userData?.gender : "Prefer not to say"}
                </li>
                <li>
                  <strong>Date of birth:</strong>{" "}
                  {userData?.birthDate
                    ? formatDate(userData?.birthDate)
                    : "N/A"}
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-primary underline underline-offset-4">
              Contact Information
            </h3>
            <div className="mt-2">
              <ul className="space-y-1">
                <li>
                  <strong>Country:</strong>{" "}
                  {userData?.country ? userData?.country : "N/A"}
                </li>
                <li>
                  <strong>Address:</strong>{" "}
                  {userData?.address ? userData?.address : "N/A"}
                </li>
                <li>
                  <strong>Email:</strong> {userData?.email}
                </li>
                <li>
                  <strong>Phone Number:</strong>{" "}
                  {userData?.phone ? userData?.phone : "N/A"}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="md:my-10 my-5" />
        <div>
          <h3 className="text-2xl font-bold text-primary underline underline-offset-4">
            Education and Skills
          </h3>
        </div>
      </div>
    </>
  );
};

export default ProfileInfoTab;
