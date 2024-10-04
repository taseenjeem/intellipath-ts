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
  removeLesson,
  updateInstructor,
} from "@/redux/slices/publishCourseSlice";
import { IoCloseSharp, IoCheckmarkSharp, IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddLessonsModal from "@/src/components/page/publish-a-new-course-page/AddLessonsModal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PublishCoursePage = () => {
  const dispatch = useAppDispatch();
  const course = useAppSelector((state) => state.publishCourseInfo);
  const router = useRouter();
  const { _id, username } = useAppSelector((state) => state.userInfo);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  useEffect(() => {
    dispatch(updateInstructor(_id));
  }, [_id, dispatch]);

  const openModal = () => {
    const logoutModal = document.getElementById(
      "add_lesson"
    ) as HTMLDialogElement | null;

    if (logoutModal) {
      logoutModal.showModal();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("userID", _id);
      formData.append("courseData", JSON.stringify(course));

      if (thumbnailFile) {
        formData.append("image", thumbnailFile);
      } else {
        toast.warn("Please attach a thumbnail");
        return;
      }

      const response = await fetch(`/api/publish-course`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        console.log("Failed to publish course:", errorData.message);
        return;
      }

      const result = await response.json();

      if (result) {
        toast.success("Course published successfully!");
        dispatch(resetPublishCourseForm());
        router.push(`/profile/${username}/my-courses`);
      }
    } catch (error) {
      toast.warn("Please attach a thumbnail");
      console.log("Error in handleSubmit:", error);
    }
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
              className="btn btn-primary"
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
                required
                type="text"
                id="title"
                name="title"
                className="input input-bordered"
                value={course.title ?? ""}
                onChange={(e) => dispatch(updateTitle(e.target.value))}
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="slug">
                <span className="label-text">Course URL</span>
                <span className="label-text">(Slug)</span>
              </label>
              <input
                required
                type="text"
                id="slug"
                name="slug"
                className="input input-bordered"
                value={course.slug ?? ""}
                onChange={(e) => dispatch(updateSlug(e.target.value))}
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="category">
                <span className="label-text">Select your category</span>
              </label>
              <select
                required
                id="category"
                name="category"
                className="select select-bordered"
                value={course.category ?? ""}
                onChange={(e) => dispatch(updateCategory(e.target.value))}
              >
                <option value="">Pick a category</option>
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
                required
                id="thumbnail"
                name="thumbnail"
                type="file"
                className="file-input file-input-bordered"
                onChange={(e) => {
                  if (e.target.files) {
                    setThumbnailFile(e.target.files[0]);
                  }
                }}
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="price">
                <span className="label-text">Price (in USD)</span>
              </label>
              <input
                required
                type="number"
                id="price"
                name="price"
                className="input input-bordered"
                value={!!course.price ? course.price : ""}
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
                value={!!course.discount ? course.discount : ""}
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
                required
                id="language"
                name="language"
                className="select select-bordered"
                value={course.language ?? ""}
                onChange={(e) => dispatch(updateLanguage(e.target.value))}
              >
                <option value="">Pick your course language</option>
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
                required
                type="number"
                id="duration"
                name="duration"
                className="input input-bordered"
                value={!!course.duration ? course.duration : ""}
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
                required
                id="level"
                name="level"
                className="select select-bordered"
                value={course.level ?? ""}
                onChange={(e) => dispatch(updateLevel(e.target.value))}
              >
                <option value="">Pick a course level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Professional">Professional</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label">
              <span className="label-text">Lessons</span>
            </label>
            {course.lessons.length === 0 ? (
              <div
                onClick={openModal}
                role="button"
                className="border rounded-2xl w-full h-44 flex gap-2 flex-col items-center justify-center hover:text-primary hover:border-primary duration-300"
              >
                <IoIosAddCircleOutline size={60} />
                Add lessons for your course
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-5">
                  {course.lessons.map((lesson, index) => (
                    <div
                      key={lesson.title}
                      className="p-3 bg-primary rounded-xl text-primary-content relative"
                    >
                      <button
                        type="button"
                        className="bg-red-500 text-white p-1 rounded-full flex justify-end items-center absolute -top-2 -right-2"
                        onClick={() => dispatch(removeLesson(lesson.title))}
                      >
                        <IoClose />
                      </button>
                      <h4 className="text-lg font-semibold">
                        {index + 1}. {lesson.title}
                      </h4>
                      <p>{lesson.url}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={openModal}
                  className="btn btn-primary btn-outline w-full"
                >
                  <IoIosAddCircleOutline size={24} />
                  Add lessons for your course
                </button>
              </div>
            )}
          </div>
          <div className="form-control">
            <label className="label" htmlFor="requirements">
              <span className="label-text">Minimum requirements</span>
              <span className="label-text">(minimum 1000 characters)</span>
            </label>
            <textarea
              required
              maxLength={1000}
              id="requirements"
              name="requirements"
              className="textarea textarea-bordered min-h-44"
              value={course.requirements ?? ""}
              onChange={(e) => dispatch(updateRequirements(e.target.value))}
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="short_description">
              <span className="label-text">A Short description</span>
              <span className="label-text">(maximum 100 characters)</span>
            </label>
            <textarea
              required
              maxLength={100}
              id="short_description"
              name="short_description"
              className="textarea textarea-bordered min-h-44"
              value={course.short_description ?? ""}
              onChange={(e) => dispatch(updateShortDescription(e.target.value))}
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="full_description">
              <span className="label-text">Full description of the course</span>
            </label>
            <textarea
              required
              maxLength={1000}
              id="full_description"
              name="full_description"
              className="textarea textarea-bordered min-h-96"
              value={course.full_description ?? ""}
              onChange={(e) => dispatch(updateFullDescription(e.target.value))}
            />
          </div>
        </div>
      </form>
      <AddLessonsModal />
    </>
  );
};

export default PublishCoursePage;
