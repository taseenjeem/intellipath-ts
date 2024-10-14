"use client";
import { useAppDispatch } from "@/redux/store";
import { addLesson } from "@/redux/slices/publishCourseSlice";
import { CgClose } from "react-icons/cg";
import { useState } from "react";

const AddLessonsModal = ({ editMode = false }: { editMode?: boolean }) => {
  const dispatch = useAppDispatch();
  const [lessonDetails, setLessonDetails] = useState({ title: "", url: "" });
  const [error, setError] = useState({ titleError: "", urlError: "" });

  const isValidYouTubeUrl = (url: string) => {
    const youtubeRegex =
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gm;
    return youtubeRegex.test(url);
  };

  const handleAddLesson = () => {
    let valid = true;

    if (!lessonDetails.title) {
      setError((prev) => ({ ...prev, titleError: "Title is required" }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, titleError: "" }));
    }

    if (!lessonDetails.url || !isValidYouTubeUrl(lessonDetails.url)) {
      setError((prev) => ({
        ...prev,
        urlError: "Please enter a valid YouTube URL",
      }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, urlError: "" }));
    }

    if (valid) {
      if (!editMode) {
        dispatch(
          addLesson({ title: lessonDetails.title, url: lessonDetails.url })
        );
      }
      closeModal();
      setLessonDetails({ title: "", url: "" });
    }
  };

  const closeModal = () => {
    const lessonModal = document.getElementById(
      "add_lesson"
    ) as HTMLDialogElement | null;
    if (lessonModal) {
      lessonModal.close();
    }
    setLessonDetails({ title: "", url: "" });
    setError({ titleError: "", urlError: "" });
  };

  return (
    <>
      <dialog id="add_lesson" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-primary mb-5">Add Lesson</h3>
            <span
              onClick={closeModal}
              className="btn btn-primary btn-circle btn-sm"
            >
              <CgClose />
            </span>
          </div>
          <div className="space-y-5">
            <div className="form-control">
              <label htmlFor="title" className="label">
                <span
                  className={`label-text ${
                    error.titleError ? "text-error" : ""
                  }`}
                >
                  Lesson title
                </span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className={`input input-bordered ${
                  error.titleError ? "input-error" : ""
                }`}
                value={lessonDetails.title}
                onChange={(e) =>
                  setLessonDetails({ ...lessonDetails, title: e.target.value })
                }
              />
              {error.titleError && (
                <label htmlFor="title" className="label">
                  <span className="label-text text-error">
                    {error.titleError}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="url" className="label">
                <span
                  className={`label-text ${error.urlError ? "text-error" : ""}`}
                >
                  Lesson URL
                </span>
                <span
                  className={`label-text ${error.urlError ? "text-error" : ""}`}
                >
                  (YouTube Video)
                </span>
              </label>
              <input
                id="url"
                name="url"
                type="text"
                className={`input input-bordered ${
                  error.urlError ? "input-error" : ""
                }`}
                value={lessonDetails.url}
                onChange={(e) =>
                  setLessonDetails({ ...lessonDetails, url: e.target.value })
                }
              />
              {error.urlError && (
                <label htmlFor="url" className="label">
                  <span className="label-text text-error">
                    {error.urlError}
                  </span>
                </label>
              )}
            </div>

            <div className="flex justify-end">
              <button className="btn btn-primary" onClick={handleAddLesson}>
                Add lesson
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddLessonsModal;
