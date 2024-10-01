"use client";
import { useAppDispatch } from "@/redux/store";
import { addLesson } from "@/redux/slices/publishCourseSlice";
import { CgClose } from "react-icons/cg";
import { useState } from "react";

const AddLessonsModal = () => {
  const dispatch = useAppDispatch();
  const [lessonDetails, setLessonDetails] = useState({ title: "", url: "" });

  const handleAddLesson = () => {
    if (lessonDetails.title && lessonDetails.url) {
      dispatch(
        addLesson({ title: lessonDetails.title, url: lessonDetails.url })
      );
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
                <span className="label-text">Lesson title</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className="input input-bordered"
                value={lessonDetails.title}
                onChange={(e) =>
                  setLessonDetails({ ...lessonDetails, title: e.target.value })
                }
              />
            </div>
            <div className="form-control">
              <label htmlFor="url" className="label">
                <span className="label-text">Lesson URL</span>
                <span className="label-text">(YouTube Video)</span>
              </label>
              <input
                id="url"
                name="url"
                type="text"
                className="input input-bordered"
                value={lessonDetails.url}
                onChange={(e) =>
                  setLessonDetails({ ...lessonDetails, url: e.target.value })
                }
              />
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
