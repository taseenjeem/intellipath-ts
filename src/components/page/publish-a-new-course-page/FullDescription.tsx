"use client";
import { updateFullDescription } from "@/redux/slices/publishCourseSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FullDescription = ({ editMode = false }: { editMode?: boolean }) => {
  const dispatch = useAppDispatch();

  const { full_description: fromUpload } = useAppSelector(
    (state) => state.publishCourseInfo
  );

  const {
    courseData: { full_description: fromEdit },
  } = useAppSelector((state) => state.editCourse);

  const handleChange = (e: React.ChangeEvent) => {};

  return (
    <>
      <label className="label" htmlFor="full_description">
        <span className="label-text">Full description of the course</span>
      </label>
      <ReactQuill
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link"],
          ],
        }}
        theme="snow"
        value={editMode ? fromEdit ?? "" : fromUpload ?? ""}
        onChange={(value) => dispatch(updateFullDescription(value))}
      />
    </>
  );
};

export default FullDescription;
