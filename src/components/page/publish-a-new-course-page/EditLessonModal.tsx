"use client";
import { editLessonTitle, editLessonURL } from "@/redux/slices/editCourse";
import { useAppDispatch } from "@/redux/store";
import { CgClose } from "react-icons/cg";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

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

  useEffect(() => {
    setTitle(lesson.title);
    setUrl(lesson.url);
  }, [lesson]);

  const closeModal = () => {
    const editLessonModal = document.getElementById(
      "edit_lesson"
    ) as HTMLDialogElement | null;
    if (editLessonModal) {
      editLessonModal.close();
    }
  };

  const handleSaveChanges = () => {
    if (!title || !url) {
      toast.warn("You must provide a title or url");
      return;
    } else {
      dispatch(editLessonTitle({ lessonId: lesson._id, newTitle: title }));
      dispatch(editLessonURL({ lessonId: lesson._id, newURL: url }));
      closeModal();
    }
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
            <span className="label-text">Lesson Title</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="input input-bordered"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="url" className="label">
            <span className="label-text">Lesson URL</span>
            <span className="label-text">(YouTube Video)</span>
          </label>
          <input
            type="url"
            id="url"
            name="url"
            className="input input-bordered"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
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
