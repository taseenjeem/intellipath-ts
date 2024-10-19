"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ICourse } from "@/types";
import { useEffect } from "react";
import { BiDollarCircle } from "react-icons/bi";
import {
  initializeCourseData,
  setIsLoading,
  editCategory,
  editLevel,
  editRequirements,
  editDiscount,
  editDuration,
  editLanguage,
  editPrice,
  editShortDescription,
  editTitle,
  removeLesson,
} from "@/redux/slices/editCourse";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddLessonsModal from "../publish-a-new-course-page/AddLessonsModal";
import FullDescription from "../publish-a-new-course-page/FullDescription";

const EditCourseForm = ({ course }: { course: ICourse }) => {
  const dispatch = useAppDispatch();
  const { courseData } = useAppSelector((state) => state.editCourse);
  console.log("🚀 ~ EditCourseForm ~ courseData:", courseData.coupons);

  useEffect(() => {
    dispatch(initializeCourseData(course));
  }, [course, dispatch]);

  const openModal = () => {
    const logoutModal = document.getElementById(
      "add_lesson"
    ) as HTMLDialogElement | null;

    if (logoutModal) {
      logoutModal.showModal();
    }
  };

  const handleEditCourse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setIsLoading(true));
    try {
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <>
      <form onSubmit={handleEditCourse} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="form-control">
            <label htmlFor="title" className="label">
              <span className="label-text">Course Title</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="input input-bordered"
              value={courseData.title}
              onChange={(e) => dispatch(editTitle(e.target.value))}
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
              value={courseData.category}
              onChange={(e) => dispatch(editCategory(e.target.value))}
            >
              <option value="">Pick a category</option>
              <option value="Business & Finance">Business & Finance</option>
              <option value="Technology & Programming">
                Technology & Programming
              </option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Creative Arts">Creative Arts</option>
              <option value="Personal Development">Personal Development</option>
              <option value="Language & Culture">Language & Culture</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label" htmlFor="price">
              <span className="label-text">Price (in USD)</span>
            </label>
            <span className="input input-bordered flex items-center gap-2">
              <BiDollarCircle size={24} />
              <input
                required
                type="number"
                id="price"
                name="price"
                className="grow"
                value={courseData.price}
                onChange={(e) => dispatch(editPrice(Number(e.target.value)))}
              />
            </span>
          </div>
          <div className="form-control">
            <label className="label" htmlFor="discount">
              <span className="label-text">Discount (in USD)</span>
            </label>
            <span className="input input-bordered flex items-center gap-2">
              <BiDollarCircle size={24} />
              <input
                type="number"
                id="discount"
                name="discount"
                className="grow"
                value={!!courseData.discount ? courseData.discount : ""}
                onChange={(e) => dispatch(editDiscount(Number(e.target.value)))}
              />
            </span>
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
              value={course.language}
              onChange={(e) => dispatch(editLanguage(e.target.value))}
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
              value={courseData.duration}
              onChange={(e) => dispatch(editDuration(Number(e.target.value)))}
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
              value={courseData.level}
              onChange={(e) => dispatch(editLevel(e.target.value))}
            >
              <option value="">Pick a course level</option>
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
            required
            maxLength={1000}
            id="requirements"
            name="requirements"
            className="textarea textarea-bordered min-h-44"
            value={courseData.requirements}
            onChange={(e) => dispatch(editRequirements(e.target.value))}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Manage your coupons and discounts
            </span>
          </label>
          <div className="flex items-center gap-3">
            <div className="lg:w-[70%] w-full border custom-border p-5 rounded-xl h-60 overflow-auto">
              {courseData.coupons && courseData.coupons.length > 0 ? (
                courseData.coupons.map((coupon) => (
                  <div key={coupon._id ? coupon._id : coupon.code} />
                ))
              ) : (
                <div className="flex items-center justify-center h-full text-sm">
                  <p>There are no coupons added yet!</p>
                </div>
              )}
            </div>
            <div className="lg:w-[30%] w-full">
              <div className="form-control">
                <label className="label" htmlFor="code">
                  <span className="label-text">Coupon Code</span>
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  className="input input-bordered"
                />
              </div>
              <span className="form-control">
                <label className="label" htmlFor="discount">
                  <span className="label-text">Coupon Discount</span>
                </label>
                <input
                  min={10}
                  type="number"
                  id="discount"
                  name="discount"
                  className="input input-bordered"
                />
              </span>
              <button className="btn btn-primary w-full mt-4">
                Add Coupon
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <label className="label">
            <span className="label-text">Manage your Lessons</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courseData.lessons?.map((lesson, index) => (
              <div
                key={lesson.title}
                className="p-3 border border-primary rounded-xl relative"
              >
                <button
                  type="button"
                  className="bg-red-500 text-white p-1 rounded-full flex justify-end items-center absolute -top-2 -right-2"
                  onClick={() => dispatch(removeLesson(lesson._id))}
                >
                  <IoClose />
                </button>
                <h4 className="text-lg font-semibold leading-none mb-3">
                  {index + 1}. {lesson.title}
                </h4>
                <span className="text-sm line-clamp-1">
                  <strong>Link: </strong>
                  <Link
                    className="link-hover"
                    target="_blank"
                    href={lesson.url}
                  >
                    {lesson.url}
                  </Link>
                </span>
              </div>
            ))}
          </div>
          <button onClick={openModal} className="btn btn-primary w-full mt-3">
            <IoIosAddCircleOutline size={24} />
            Add lessons for your course
          </button>
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
            value={courseData.short_description}
            onChange={(e) => dispatch(editShortDescription(e.target.value))}
          />
        </div>
      </form>
      <FullDescription editMode />
      <AddLessonsModal editMode />
    </>
  );
};

export default EditCourseForm;
