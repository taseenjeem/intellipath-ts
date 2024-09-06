"use client";
import Image from "next/image";
import { MdModeEdit } from "react-icons/md";

interface IUserAvatarProps {
  profileImageUrl: string | null;
}

const UserAvatar = ({ profileImageUrl }: IUserAvatarProps) => {
  return (
    <div className="relative">
      <div className="avatar">
        <div className="ring-primary ring-offset-base-100 w-20 md:w-40 rounded-full ring ring-offset-2">
          <Image
            src={
              profileImageUrl
                ? profileImageUrl
                : "/assets/images/profile-placeholder.jpg"
            }
            width={160}
            height={160}
            alt="User profile avatar"
          />
        </div>
      </div>
      <button className="btn btn-sm btn-circle btn-primary absolute md:bottom-4 bottom-0 right-0">
        <MdModeEdit className="text-white" />
      </button>
    </div>
  );
};

export default UserAvatar;
