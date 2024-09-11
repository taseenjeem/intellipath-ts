"use client";
import Image from "next/image";
import { MdModeEdit } from "react-icons/md";
import { getUserByEmail } from "@/database/server-actions";
import { useAppDispatch } from "@/redux/store";
import { updateUserInfo } from "@/redux/slices/UserInfoSlice";
import { toast } from "react-toastify";

interface IUserAvatarProps {
  profileImageUrl: string | null;
  userId: string;
  userEmail: string;
}

const UserAvatar = ({
  profileImageUrl,
  userId,
  userEmail,
}: IUserAvatarProps) => {
  const dispatch = useAppDispatch();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("userId", userId);

      try {
        const response = await fetch("/api/upload-profile-image", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          const userInfo = await getUserByEmail(userEmail);
          if (userInfo) {
            dispatch(updateUserInfo(userInfo));
            toast.success("Profile picture updated successfully");
          }
        } else {
          console.error("Image upload failed:", result.message);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="relative">
      <div className="avatar">
        <div className="ring-primary ring-offset-base-100 w-20 md:w-40 rounded-full ring ring-offset-2">
          <Image
            src={profileImageUrl || "/assets/images/profile-placeholder.jpg"}
            width={160}
            height={160}
            alt="User profile avatar"
          />
        </div>
      </div>
      <label
        htmlFor="profileImageUrl"
        className="btn btn-sm btn-circle btn-primary cursor-pointer absolute md:bottom-4 bottom-0 right-0 flex justify-center items-center"
      >
        <MdModeEdit className="text-white cursor-pointer" />
        <input
          type="file"
          name="profileImageUrl"
          id="profileImageUrl"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default UserAvatar;
