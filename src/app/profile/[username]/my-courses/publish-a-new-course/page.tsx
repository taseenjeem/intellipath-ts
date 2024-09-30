"use client";
import { useAppSelector } from "@/redux/store";

const PublishCoursePage = () => {
  const { _id: instructor } = useAppSelector((state) => state.userInfo);

  return (
    <>
      <h1 className="text-xl md:text-2xl text-primary font-semibold my-5">
        Publish a new course
      </h1>
      <div>
        <form action="">
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
                >
                  <option disabled selected>
                    Pick a category
                  </option>
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
                  <span className="label-text">Price</span>
                  <span className="label-text">(in USD)</span>
                </label>
                <input
                  min={0}
                  type="number"
                  id="price"
                  name="price"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="discount">
                  <span className="label-text">Discount</span>
                  <span className="label-text">(in USD)</span>
                </label>
                <input
                  min={0}
                  type="number"
                  id="discount"
                  name="discount"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="language">
                  <span className="label-text">
                    Select your course language
                  </span>
                </label>
                <select
                  id="language"
                  name="language"
                  className="select select-bordered"
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
                  min={0}
                  type="number"
                  id="duration"
                  name="duration"
                  className="input input-bordered"
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
                >
                  <option selected value="Beginner">
                    Beginner
                  </option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>
            </div>
            <div className="form-control">
              <label className="label" htmlFor="requirements">
                <span className="label-text">
                  Minimum requirements to start the course
                </span>
                <span className="label-text">(minimum 1000 characters)</span>
              </label>
              <textarea
                maxLength={1000}
                id="requirements"
                name="requirements"
                className="textarea textarea-bordered min-h-44"
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
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="full_description">
                <span className="label-text">
                  Full description of the course
                </span>
              </label>
              <textarea
                maxLength={1000}
                id="full_description"
                name="full_description"
                className="textarea textarea-bordered min-h-96"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PublishCoursePage;
