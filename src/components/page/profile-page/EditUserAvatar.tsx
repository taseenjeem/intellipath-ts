"use client";
import Image from "next/image";
import { MdModeEdit } from "react-icons/md";
import { getUserByEmail } from "@/database/server-actions";
import { useAppDispatch } from "@/redux/store";
import { updateUserInfo } from "@/redux/slices/UserInfoSlice";
import { toast } from "react-toastify";

interface IEditUserAvatarProps {
  profileImageUrl: string | null | undefined;
  userId: string;
  userEmail: string;
}

const EditUserAvatar = ({
  profileImageUrl,
  userId,
  userEmail,
}: IEditUserAvatarProps) => {
  const dispatch = useAppDispatch();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 1) {
      toast.warning("Please select only one file.");
      return;
    }

    const file = files?.[0];

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
          toast.error(`Image upload failed: ${result.message}`);
          console.log("Image upload failed:", result.message);
        }
      } catch (error) {
        toast.error("Error uploading image. Please try again.");
        console.log("Error uploading image:", error);
      }
    } else {
      toast.error("No file selected. Please choose a file.");
    }
  };

  return (
    <div className="relative size-40 mt-6 mb-10 mx-auto">
      <div className="avatar">
        <div className="ring-primary ring-offset-base-100 w-40 rounded-full ring ring-offset-2">
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

export default EditUserAvatar;
