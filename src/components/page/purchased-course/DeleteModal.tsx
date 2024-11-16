"use client";
import { deleteReview } from "@/database/server-actions";
import { ITestimonial } from "@/types";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

interface IDeleteModalProps {
  reviewId: string;
  courseId: string;
  setReview: React.Dispatch<React.SetStateAction<ITestimonial | null>>;
}

const DeleteModal = ({ reviewId, courseId, setReview }: IDeleteModalProps) => {
  const openModal = () => {
    const filterModal = document.getElementById(
      "delete_review_modal"
    ) as HTMLDialogElement | null;

    if (filterModal) {
      filterModal.showModal();
    }
  };

  const closeModal = () => {
    const filterModal = document.getElementById(
      "delete_review_modal"
    ) as HTMLDialogElement | null;

    if (filterModal) {
      filterModal.close();
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteReview(reviewId, courseId);

      if (result) {
        closeModal();
        toast.success("Review deleted successfully!");
        setReview(null);
      } else {
        toast.error("Failed to delete the review. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <button onClick={openModal} className="btn btn-error btn-xs md:btn-sm">
        <MdDelete /> Delete
      </button>
      <dialog
        id="delete_review_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box space-y-5">
          <h3 className="font-bold text-lg">
            Are you sure to delete this review?
          </h3>
          <p>
            Your feedback is very important to us. We expect honest feedback
            from you!
          </p>
          <div className="flex justify-end gap-4">
            <button onClick={closeModal} className="btn btn-primary">
              Cancel
            </button>
            <button onClick={handleDelete} className="btn btn-error">
              Delete
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeleteModal;
