"use client";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";

const AddReview = () => {
  const [ratingValue, setRatingValue] = useState<number>(0);

  const handleRating = (rate: number) => {
    setRatingValue(rate);
  };

  const addReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="mt-10 space-y-4">
      <h3 className="text-2xl text-primary font-semibold underline">
        Add your review
      </h3>
      <div>
        <h3 className="label-text">Rate this course out of 5 stars:</h3>
        <Rating SVGstyle={{ display: "inline-block" }} onClick={handleRating} />
      </div>
      <form onSubmit={addReview}>
        <div className="form-control">
          <label className="label" htmlFor="review">
            <span className="label-text">
              Tell us about your experience and improvements
            </span>
          </label>
          <textarea
            id="review"
            name="review"
            className="textarea textarea-bordered min-h-52"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-5">
          Add your review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
