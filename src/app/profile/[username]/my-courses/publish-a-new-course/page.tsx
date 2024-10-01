"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  updateTitle,
  updateSlug,
  updateCategory,
  updatePrice,
  updateDiscount,
  updateLanguage,
  updateDuration,
  updateRequirements,
  updateLevel,
  updateShortDescription,
  updateFullDescription,
  resetPublishCourseForm,
} from "@/redux/slices/publishCourseSlice";
import { IoCloseSharp, IoCheckmarkSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

const PublishCoursePage = () => {
  const dispatch = useAppDispatch();
  const course = useAppSelector((state) => state.publishCourseInfo);
  const router = useRouter();
  const { _id: instructor, username } = useAppSelector(
    (state) => state.userInfo
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleCancel = () => {
    dispatch(resetPublishCourseForm());
    router.push(`/profile/${username}/my-courses`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <h1 className="text-xl md:text-2xl text-primary font-semibold my-5">
            Publish a new course
          </h1>
          <div className="space-x-5">
            <button
              onClick={handleCancel}
              type="reset"
              className="btn btn-primary "
            >
              Cancel <IoCloseSharp size={20} />
            </button>
            <button type="submit" className="btn btn-primary ">
              Publish Course <IoCheckmarkSharp size={20} />
            </button>
          </div>
        </div>
        <div className="space-y-5">
          <div className="grid grid-cols-3 gap-5">
            <div className="form-control">
              <label className="label" htmlFor="title">
                <span className="label-text">Course Title</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="input input-bordered"
                value={course.title}
                onChange={(e) => dispatch(updateTitle(e.target.value))}
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="slug">
                <span className="label-text">Course URL</span>
                <span className="label-text">(Slug)</span>
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                className="input input-bordered"
                value={course.slug}
                onChange={(e) => dispatch(updateSlug(e.target.value))}
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="category">
                <span className="label-text">Select your category</span>
              </label>
              <select
                id="category"
                name="category"
                className="select select-bordered"
                value={course.category}
                onChange={(e) => dispatch(updateCategory(e.target.value))}
              >
                <option disabled>Pick a category</option>
                <option value="Business & Finance">Business & Finance</option>
                <option value="Technology & Programming">
                  Technology & Programming
                </option>
                <option value="Health & Wellness">Health & Wellness</option>
                <option value="Creative Arts">Creative Arts</option>
                <option value="Personal Development">
                  Personal Development
                </option>
                <option value="Language & Culture">Language & Culture</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label" htmlFor="thumbnail">
                <span className="label-text">Select a thumbnail</span>
              </label>
              <input
                id="thumbnail"
                name="thumbnail"
                type="file"
                className="file-input file-input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="price">
                <span className="label-text">Price (in USD)</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="input input-bordered"
                value={course.price}
                onChange={(e) => dispatch(updatePrice(Number(e.target.value)))}
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="discount">
                <span className="label-text">Discount (in USD)</span>
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                className="input input-bordered"
                value={course.discount}
                onChange={(e) =>
                  dispatch(updateDiscount(Number(e.target.value)))
                }
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="language">
                <span className="label-text">Select your course language</span>
              </label>
              <select
                id="language"
                name="language"
                className="select select-bordered"
                value={course.language}
                onChange={(e) => dispatch(updateLanguage(e.target.value))}
              >
                <option value="English">English - International</option>
                <option value="বাংলা">বাংলা - Bangla</option>
                <option value="اردو">اردو - Urdu</option>
                <option value="हिंदी">हिंदी - Hindi</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label" htmlFor="duration">
                <span className="label-text">Total Course Duration</span>
                <span className="label-text">(in minutes)</span>
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                className="input input-bordered"
                value={course.duration}
                onChange={(e) =>
                  dispatch(updateDuration(Number(e.target.value)))
                }
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="level">
                <span className="label-text">Course level</span>
              </label>
              <select
                id="level"
                name="level"
                className="select select-bordered"
                value={course.level}
                onChange={(e) => dispatch(updateLevel(e.target.value))}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Professional">Professional</option>
              </select>
            </div>
          </div>
          <div className="form-control">
            <label className="label" htmlFor="requirements">
              <span className="label-text">Minimum requirements</span>
              <span className="label-text">(minimum 1000 characters)</span>
            </label>
            <textarea
              maxLength={1000}
              id="requirements"
              name="requirements"
              className="textarea textarea-bordered min-h-44"
              value={course.requirements}
              onChange={(e) => dispatch(updateRequirements(e.target.value))}
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="short_description">
              <span className="label-text">A Short description</span>
              <span className="label-text">(maximum 100 characters)</span>
            </label>
            <textarea
              maxLength={100}
              id="short_description"
              name="short_description"
              className="textarea textarea-bordered min-h-44"
              value={course.short_description}
              onChange={(e) => dispatch(updateShortDescription(e.target.value))}
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="full_description">
              <span className="label-text">Full description of the course</span>
            </label>
            <textarea
              maxLength={1000}
              id="full_description"
              name="full_description"
              className="textarea textarea-bordered min-h-96"
              value={course.full_description}
              onChange={(e) => dispatch(updateFullDescription(e.target.value))}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default PublishCoursePage;
