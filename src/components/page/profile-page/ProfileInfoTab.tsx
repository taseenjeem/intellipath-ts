"use client";
import { formatDate } from "@/utils/dateFormatter";
import Image from "next/image";
import Link from "next/link";
import {
  FaChalkboardTeacher,
  FaGithub,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbWorldWww } from "react-icons/tb";
import { PiStudentFill } from "react-icons/pi";
import { useAppSelector } from "@/redux/store";

const ProfileInfoTab = () => {
  const userData = useAppSelector((state) => state.userInfo);

  return (
    <>
      <div className="w-full mt-5 bg-base-200 p-4 md:p-6 rounded-3xl">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-5">
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 size-44 rounded-full ring ring-offset-2">
                <Image
                  width={176}
                  height={176}
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
          <ul className="space-y-2 my-8 md:my-0">
            {userData?.socialLinks?.facebook && (
              <li className="flex items-center gap-2">
                <FaFacebook size={25} />
                <Link
                  href={userData?.socialLinks?.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-hover"
                >
                  Facebook
                </Link>
              </li>
            )}
            {userData?.socialLinks?.twitter && (
              <li className="flex items-center gap-2">
                <FaXTwitter size={25} />
                <Link
                  href={userData?.socialLinks?.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-hover"
                >
                  X (twitter)
                </Link>
              </li>
            )}
            {userData?.socialLinks?.linkedin && (
              <li className="flex items-center gap-2">
                <FaLinkedin size={25} />
                <Link
                  href={userData?.socialLinks?.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-hover"
                >
                  LinkedIn
                </Link>
              </li>
            )}
            {userData?.socialLinks?.github && (
              <li className="flex items-center gap-2">
                <FaGithub size={25} />
                <Link
                  href={userData?.socialLinks?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-hover"
                >
                  Github
                </Link>
              </li>
            )}
            {userData?.socialLinks?.website && (
              <li className="flex items-center gap-2">
                <TbWorldWww size={25} />
                <Link
                  href={userData?.socialLinks?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-hover"
                >
                  Website
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="space-y-3 md:mt-10">
          <h3 className="text-2xl font-bold text-primary underline underline-offset-4">
            About {userData?.fullName}
          </h3>
          {userData?.biography ? (
            <p>{userData?.biography}</p>
          ) : (
            <div className="border rounded-lg p-10 md:p-20 mt-5">
              <p className="text-center">
                You have not added any bio yet! Go to the &quot;Settings&quot;
                tab to add your bio.
              </p>
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
        <div>
          <h3 className="text-2xl font-bold text-primary underline underline-offset-4 mt-10">
            Academic Education
          </h3>
          {userData?.education && userData?.education.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
              {userData?.education?.map((item) => (
                <div
                  className="p-3 md:p-6 rounded-xl w-full h-full bg-base-300 hover:shadow-xl border border-base-300 hover:border-primary duration-300"
                  key={item.degree}
                >
                  <ul>
                    <li className="text-xl font-bold">{item.degree}</li>
                    <li className="my-1 text-sm">
                      {formatDate(item.startDate)} -{" "}
                      {item.endDate === "present"
                        ? "Present"
                        : formatDate(item.endDate)}
                    </li>
                    <hr className="my-3 border-gray-400" />
                    <li>
                      <strong>Institution: </strong>
                      {item.institution}
                    </li>
                    <li>
                      <strong>Location: </strong>
                      {item.location}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="border rounded-lg p-10 md:p-20 mt-5">
              <p className="text-center">
                You have not added any education qualifications yet! Go to the
                &quot;Settings&quot; tab to add your academic education.
              </p>
            </div>
          )}
        </div>
        {userData?.role === "instructor" && (
          <div>
            <h3 className="text-2xl font-bold text-primary underline underline-offset-4 mt-10">
              Teaching Experience
            </h3>
            {userData?.experience && userData?.experience.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
                {userData?.experience.map((item) => (
                  <div
                    className="p-3 md:p-6 rounded-xl w-full h-full bg-base-100 hover:shadow-xl border border-base-100 hover:border-primary duration-300 relative"
                    key={item.companyName}
                  >
                    <ul>
                      <li className="text-xl font-bold">{item.companyName}</li>
                      <li className="my-1 text-sm">
                        {formatDate(item.startDate)} -{" "}
                        {item.endDate === "present"
                          ? "Present"
                          : formatDate(item.endDate)}
                      </li>
                      <hr className="my-3 border-gray-400" />
                      <li>
                        <strong>Designation: </strong>
                        {item.designation}
                      </li>
                      <li>
                        <strong>Location: </strong>
                        {item.location}
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border rounded-lg p-10 md:p-20 mt-5">
                <p className="text-center">
                  You have not added any teaching experience yet! Go to the
                  &quot;Settings&quot; tab to add your teaching experience.
                </p>
              </div>
            )}
          </div>
        )}
        <div>
          <h3 className="text-2xl font-bold text-primary underline underline-offset-4 mt-10">
            Certifications
          </h3>
          {userData?.certifications && userData.certifications.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
              {userData?.certifications?.map((item) => (
                <div
                  className="p-3 md:p-6 rounded-xl w-full h-full bg-base-300 hover:shadow-xl border border-base-300 hover:border-primary duration-300"
                  key={item.title}
                >
                  <ul>
                    <li className="text-xl font-bold">{item.title}</li>
                    <hr className="my-3 border-gray-400" />
                    <li>
                      <strong>Issuer: </strong>
                      {item.issuer}
                    </li>
                    <li>
                      <strong>Date of Issue: </strong>
                      {formatDate(item.dateOfIssue)}
                    </li>
                    <li>
                      <Link className="link" href={item.url}>
                        Show credentials
                      </Link>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="border rounded-lg p-10 md:p-20 mt-5">
              <p className="text-center">
                You have not added any certifications yet! Go to the
                &quot;Settings&quot; tab to add your certifications.
              </p>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-primary underline underline-offset-4 mt-10">
            Skill and Expertise
          </h3>
          {userData?.expertise && userData.expertise.length > 0 ? (
            <div className="flex flex-wrap gap-3 mt-5">
              {userData?.expertise?.map((item) => (
                <div
                  className="badge badge-primary h-[2rem] text-lg leading-6 px-[0.988rem]"
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
          ) : (
            <div className="border rounded-lg p-10 md:p-20 mt-5">
              <p className="text-center">
                You have not added any expertise yet! Go to the
                &quot;Settings&quot; tab to add your skills.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileInfoTab;
