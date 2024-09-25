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

// Supported file types
const supportedFileTypes = ["image/jpeg", "image/png"];

const EditUserAvatar = ({
  profileImageUrl,
  userId,
  userEmail,
}: IEditUserAvatarProps) => {
  const dispatch = useAppDispatch();

  // Handler for when the user selects a new file to upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    // Check if multiple files were selected
    if (files && files.length > 1) {
      toast.warning("Please select only one file.");
      return;
    }

    const file = files?.[0]; // Getting the selected file

    // Check if a file was selected
    if (file) {
      // Validate file type
      if (!supportedFileTypes.includes(file.type)) {
        toast.error(
          "Unsupported file type. Please select a jpeg or png image."
        );
        return;
      }

      // Maximum file size (32MB)
      const MAX_FILE_SIZE = 32 * 1024 * 1024; // 32MB in bytes

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File is too large. Maximum allowed size is 32MB.");
        return;
      }

      const formData = new FormData(); // Creating FormData object to send file data
      formData.append("image", file); // Appending the file to the formData
      formData.append("userId", userId); // Adding user ID to the formData

      try {
        // Making a POST request to upload the image to the server
        const response = await fetch("/api/upload-profile-image", {
          method: "POST",
          body: formData,
        });

        const result = await response.json(); // Parsing the response JSON

        // Checking if the image upload was successful
        if (result.success) {
          const userInfo = await getUserByEmail(userEmail); // Fetch updated user info after upload

          // If user information is fetched successfully, update the Redux store
          if (userInfo) {
            dispatch(updateUserInfo(userInfo)); // Dispatch action to update user info in Redux
            toast.success("Profile picture updated successfully");
          }
        } else {
          toast.error(`Image upload failed: ${result.message}`);
          console.error("Image upload failed:", result.message);
        }
      } catch (error) {
        toast.error("Error uploading image. Please try again.");
        console.error("Error uploading image:", error);
      }
    } else {
      toast.error("No file selected. Please choose a file.");
    }
  };

  return (
    <div className="relative size-40 mt-6 mb-10 mx-auto">
      {/* Container for the avatar */}
      <div className="avatar">
        {/* Avatar container */}
        <div className="ring-primary ring-offset-base-100 w-40 rounded-full ring ring-offset-2">
          {/* Ring around avatar */}
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
        <MdModeEdit className="text-white cursor-pointer" /> {/* Edit icon */}
        <input
          type="file"
          name="profileImageUrl"
          id="profileImageUrl"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange} // File input change handler
        />
      </label>
    </div>
  );
};

export default EditUserAvatar;
