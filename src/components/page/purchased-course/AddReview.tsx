"use client";
import { addReview, editReview } from "@/database/server-actions";
import { useAppSelector } from "@/redux/store";
import { ITestimonial } from "@/types";
import { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";

const AddReviewForm = ({
  courseId,
  setReview,
  review,
  editMode = false,
  setReviewEditMode,
}: {
  courseId: string;
  setReview: React.Dispatch<React.SetStateAction<ITestimonial | null>>;
  review?: ITestimonial | null;
  editMode?: boolean;
  setReviewEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { _id } = useAppSelector((state) => state.userInfo);

  useEffect(() => {
    if (editMode && review) {
      setRatingValue(review.rating);
      setReviewText(review.content);
    }
  }, [editMode, review]);

  const handleRating = (rate: number) => {
    setRatingValue(rate);
  };

  const handleReviewForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (ratingValue === 0) {
      toast.warn("Please select a rating");
      setIsSubmitting(false);
      return;
    } else if (reviewText === "") {
      toast.warn("Please add your valuable review");
      setIsSubmitting(false);
      return;
    }

    const data = {
      user: _id,
      course: courseId,
      content: reviewText,
      rating: ratingValue,
    };

    try {
      if (editMode && review?._id) {
        const editReviewResult = await editReview(review._id, data);
        if (editReviewResult) {
          toast.success("Review updated successfully!");
          setReview(editReviewResult.review);
        } else {
          throw new Error("Failed to update review");
        }
      } else {
        const addReviewResult = await addReview(data);
        if (addReviewResult) {
          toast.success("Review added successfully!");
          setReview(addReviewResult.review);
        } else {
          throw new Error("Failed to add review");
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
      if (setReviewEditMode) setReviewEditMode(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="label-text">
          {editMode
            ? "Update your review:"
            : "Rate this course out of 5 stars:"}
        </h3>
        <Rating
          SVGstyle={{ display: "inline-block" }}
          onClick={handleRating}
          initialValue={ratingValue}
        />
      </div>
      <form onSubmit={handleReviewForm}>
        <div className="form-control">
          <label className="label" htmlFor="review">
            <span className="label-text">
              {editMode
                ? "Update your experience and improvements"
                : "Tell us about your experience and improvements"}
            </span>
          </label>
          <textarea
            id="review"
            name="review"
            className="textarea textarea-bordered min-h-52"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>
        <div className="flex gap-4 mt-5">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : editMode ? (
              "Update Review"
            ) : (
              "Add Review"
            )}
          </button>
          {editMode && setReviewEditMode && (
            <button
              type="button"
              onClick={() => setReviewEditMode(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddReviewForm;
