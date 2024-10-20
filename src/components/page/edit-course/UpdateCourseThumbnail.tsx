"use client";
import Image from "next/image";
import { MdModeEdit } from "react-icons/md";
import { toast } from "react-toastify";

interface IUpdateCourseThumbnailProps {
  prevImage: string;
  altText: string;
  courseId?: string;
}

const UpdateCourseThumbnail = ({
  prevImage,
  altText,
  courseId,
}: IUpdateCourseThumbnailProps) => {
  const handleUpdateThumbnail = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;

    if (files && files.length > 1) {
      toast.warning("Please select only one file.");
      return;
    }

    const file = files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append("thumbnail", file);

      if (courseId) {
        formData.append("courseID", courseId);
      } else {
        throw new Error("Please provide a course ID");
      }

      try {
        const response = await fetch("/api/update-course-thumbnail", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          toast.success("Course thumbnail updated successfully");
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
    <div className="relative w-full h-[380px] bg-black rounded-2xl">
      <Image
        fill
        className="w-full mx-auto border-2 border-primary object-contain rounded-2xl"
        src={prevImage}
        alt={altText}
      />
      <label
        htmlFor="thumbnail"
        className="btn btn-sm btn-circle btn-primary cursor-pointer absolute -top-2 -right-2 flex justify-center items-center z-10"
      >
        <MdModeEdit className="text-white cursor-pointer" />
        <input
          type="file"
          name="thumbnail"
          id="thumbnail"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleUpdateThumbnail}
        />
      </label>
    </div>
  );
};

export default UpdateCourseThumbnail;
