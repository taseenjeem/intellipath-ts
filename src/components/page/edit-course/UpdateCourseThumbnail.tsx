"use client";
import Image from "next/image";
import { MdModeEdit } from "react-icons/md";

interface IUpdateCourseThumbnailProps {
  prevImage: string;
  altText: string;
}

const UpdateCourseThumbnail = ({
  prevImage,
  altText,
}: IUpdateCourseThumbnailProps) => {
  return (
    <div className="mt-8 relative w-full h-[380px] bg-black rounded-2xl">
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
        />
      </label>
    </div>
  );
};

export default UpdateCourseThumbnail;
