"use client";
import { editLessonTitle, editLessonURL } from "@/redux/slices/editCourse";
import { useAppDispatch } from "@/redux/store";
import { CgClose } from "react-icons/cg";
import { useState, useEffect } from "react";

interface IEditLessonModalProps {
  lesson: {
    _id?: string;
    title: string;
    url: string;
  };
}

const EditLessonModal = ({ lesson }: IEditLessonModalProps) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(lesson.title);
  const [url, setUrl] = useState(lesson.url);
  const [error, setError] = useState({ titleError: "", urlError: "" });

  useEffect(() => {
    setTitle(lesson.title);
    setUrl(lesson.url);
  }, [lesson]);

  const isValidYouTubeUrl = (url: string) => {
    const youtubeRegex =
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gm;
    return youtubeRegex.test(url);
  };

  const handleSaveChanges = () => {
    let valid = true;

    if (!title) {
      setError((prev) => ({ ...prev, titleError: "Title is required" }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, titleError: "" }));
    }

    if (!url || !isValidYouTubeUrl(url)) {
      setError((prev) => ({
        ...prev,
        urlError: "Please enter a valid YouTube URL",
      }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, urlError: "" }));
    }

    if (valid) {
      dispatch(editLessonTitle({ lessonId: lesson._id, newTitle: title }));
      dispatch(editLessonURL({ lessonId: lesson._id, newURL: url }));
      closeModal();
    }
  };

  const closeModal = () => {
    const editLessonModal = document.getElementById(
      "edit_lesson"
    ) as HTMLDialogElement | null;
    if (editLessonModal) {
      editLessonModal.close();
    }
    setTitle(lesson.title);
    setUrl(lesson.url);
    setError({ titleError: "", urlError: "" });
  };

  return (
    <dialog id="edit_lesson" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-primary mb-5">Edit Lesson</h3>
          <button
            onClick={closeModal}
            className="btn btn-primary btn-circle btn-sm"
          >
            <CgClose />
          </button>
        </div>

        <div className="form-control">
          <label htmlFor="title" className="label">
            <span
              className={`label-text ${error.titleError ? "text-error" : ""}`}
            >
              Lesson Title
            </span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className={`input input-bordered ${
              error.titleError ? "input-error" : ""
            }`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {error.titleError && (
            <label htmlFor="title" className="label">
              <span className="label-text text-error">{error.titleError}</span>
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
            type="url"
            id="url"
            name="url"
            className={`input input-bordered ${
              error.urlError ? "input-error" : ""
            }`}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          {error.urlError && (
            <label htmlFor="url" className="label">
              <span className="label-text text-error">{error.urlError}</span>
            </label>
          )}
        </div>

        <button
          onClick={handleSaveChanges}
          className="btn btn-primary w-full mt-4"
        >
          Save Changes
        </button>
      </div>
    </dialog>
  );
};

export default EditLessonModal;
