"use server";
import { signIn } from "@/auth";
import {
  IChangePassForm,
  ICourse,
  ICredentialLoginFormData,
  IEnrollments,
  IPublishCourse,
  ITestimonial,
} from "@/types";
import connectMongodb from "@/services/mongoose/connectMongodb";
import User from "../db-models/userModel";
import Courses from "../db-models/courseModel";
import bcrypt from "bcryptjs";
import Enrollments from "../db-models/enrollmentsModel";
import Testimonials from "../db-models/testimonialModel";

export const getCountries = async () => {
  return import("@/database/json/countries.json").then(
    (module) => module.default
  );
};

export const credentialLogin = async (formData: ICredentialLoginFormData) => {
  try {
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });
    return {
      success: true,
      message: "You have successfully logged in.",
      userEmail: formData.email,
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: "An unexpected error occurred during login.",
    };
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    await connectMongodb();
    const user = await User.findOne({ email }).populate("courses").lean();
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log("Error finding user by email:", error);
    throw new Error("Error finding user by email");
  }
};

export const getUserByID = async (userID: string) => {
  try {
    await connectMongodb();
    const user = await User.findById(userID).populate("courses").lean();
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log("Error finding user by ID:", error);
    throw new Error("Error finding user by ID");
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    await connectMongodb();
    const user = await User.findOne({ username })
      .populate({
        path: "enrolledCourses",
        model: "enrollments",
        populate: [
          { path: "purchased_by", model: "users" },
          { path: "purchased_course", model: "courses" },
        ],
      })
      .populate({
        path: "courses",
        model: "courses",
        populate: [{ path: "instructor", model: "users" }],
      })
      .lean();

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error finding user by username:", error);
    throw new Error("Error finding user by username");
  }
};

export const uploadImage = async (file: File) => {
  const SUPPORTED_FILE_TYPES = ["image/jpeg", "image/png"];
  const MAX_FILE_SIZE = 32 * 1024 * 1024;

  if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
    return {
      success: false,
      imageUrl: null,
      message: "Unsupported file type. Please upload a JPEG or PNG image.",
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      success: false,
      imageUrl: null,
      message: "File is too large. Maximum allowed size is 32MB.",
    };
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const imgbbApiKey = process.env.IMGBB_API_KEY;

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!data.success) {
      throw new Error("Image upload failed");
    }

    const imageUrl = data.data.url;

    return {
      success: true,
      imageUrl,
      message: "Image uploaded successfully",
    };
  } catch (error) {
    console.log("Error uploading image", error);
    return {
      success: false,
      imageUrl: null,
      message: "Failed to upload image",
    };
  }
};

export const updateUserProfileImage = async (userId: string, file: File) => {
  try {
    const { success, imageUrl, message } = await uploadImage(file);

    if (success) {
      await connectMongodb();
      await User.findByIdAndUpdate(userId, { profileImageUrl: imageUrl });

      return {
        success: true,
        imageUrl,
        message,
      };
    } else {
      console.log("Error uploading image or updating user:", message);
      return {
        success: false,
        imageUrl: null,
        message: "Failed to upload image",
      };
    }
  } catch (error) {
    console.log("Error uploading image or updating user:", error);
    return {
      success: false,
      message: "Failed to upload profile picture of the user",
    };
  }
};

export const updateUserDetails = async (userId: string, updatedData: any) => {
  try {
    await connectMongodb();
    await User.findByIdAndUpdate(userId, updatedData);
  } catch (error) {
    console.log("Error updating user details:", error);
    throw new Error("Error updating user details");
  }
};

export const checkUsernameAvailability = async (username: string) => {
  try {
    await connectMongodb();
    const existingUser = await User.findOne({ username });
    return !!existingUser;
  } catch (error) {
    console.log("Error checking username:", error);
    throw new Error("Error checking username availability");
  }
};

export const changeUserPassword = async (
  userID: string,
  updatedData: IChangePassForm
) => {
  try {
    await connectMongodb();
    const existingUser = await User.findById(userID);

    if (!existingUser) {
      throw new Error("User not found");
    }

    const verifyPassword = await bcrypt.compare(
      updatedData.currentPassword,
      existingUser.password
    );
    if (!verifyPassword) {
      throw new Error("Current password is incorrect");
    }

    const isSamePassword = await bcrypt.compare(
      updatedData.newPassword,
      existingUser.password
    );

    if (isSamePassword) {
      throw new Error(
        "New password cannot be the same as the current password"
      );
    }

    const hashedPassword = await bcrypt.hash(updatedData.newPassword, 10);

    await User.findByIdAndUpdate(userID, {
      password: hashedPassword,
    });
  } catch (error) {
    const err = error as Error;
    console.log("Error updating user password:", err.message);
    throw new Error(err.message || "Error updating user password");
  }
};

export const publishCourse = async (
  userID: string,
  courseData: IPublishCourse,
  thumbnail: string
) => {
  try {
    await connectMongodb();
    const data = { ...courseData, thumbnail };
    const newCourse = new Courses(data);
    const result = await newCourse.save();

    if (result) {
      await User.findByIdAndUpdate(userID, {
        $push: { courses: result._id },
      });
      return {
        success: true,
        message: "Course published successfully",
        courseId: result._id,
      };
    }

    return { success: false, message: "Failed to save the course" };
  } catch (error) {
    const err = error as Error;
    console.log("Error in publishCourse:", err.message);
    return {
      success: false,
      message: err.message || "Error while publishing course",
    };
  }
};

export const getCourseBySlug = async (slug: string) => {
  try {
    await connectMongodb();
    const course = await Courses.findOne({ slug })
      .populate({ path: "instructor", model: "users" })
      .populate({
        path: "testimonials",
        model: "testimonials",
        populate: [
          { path: "user", model: "users" },
          { path: "course", model: "courses" },
        ],
      })
      .lean();

    return JSON.parse(JSON.stringify(course));
  } catch (error) {
    console.log("Error in getCourseBySlug:", error);
    throw new Error("Error while getting course by slug");
  }
};

export const getCourseById = async (courseID: string) => {
  try {
    await connectMongodb();
    const course = await Courses.findById(courseID)
      .populate("instructor")
      .lean();
    return JSON.parse(JSON.stringify(course));
  } catch (error) {
    console.log("Error in getCourseById:", error);
    throw new Error("Error while getting course by ID");
  }
};

export const getAllCourses = async () => {
  try {
    await connectMongodb();
    const courses = await Courses.find({}).populate("instructor").lean();
    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.log("Error in getAllCourses:", error);
    throw new Error("Error while getting all courses");
  }
};

export const updateCourseData = async (
  courseId: string,
  updatedData: ICourse
) => {
  if (!courseId) {
    throw new Error("Course ID is required");
  }

  try {
    await connectMongodb();

    const result = await Courses.findByIdAndUpdate(courseId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      throw new Error("Course not found");
    }

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error in update course data:", error);
    throw new Error("An error occurred while updating the course data.");
  }
};

export const updateCourseThumbnail = async (courseId: string, file: File) => {
  try {
    const { success, imageUrl, message } = await uploadImage(file);

    if (success) {
      await connectMongodb();
      await Courses.findByIdAndUpdate(courseId, { thumbnail: imageUrl });

      return {
        success: true,
        imageUrl,
        message,
      };
    } else {
      console.log(
        "Error uploading image or updating course thumbnail:",
        message
      );
      return {
        success: false,
        imageUrl: null,
        message: "Failed to upload image",
      };
    }
  } catch (error) {
    console.log("Error uploading image or course thumbnail:", error);
    return {
      success: false,
      message: "Failed to upload the thumbnail of the course",
    };
  }
};

export const enrollment = async (
  data: IEnrollments,
  userID: string,
  courseID: string
) => {
  try {
    await connectMongodb();

    const existingEnrollment = await Enrollments.findOne({
      purchased_by: userID,
      purchased_course: courseID,
    });

    if (existingEnrollment) {
      return {
        success: false,
        message: "You are already enrolled in this course.",
      };
    }

    const result = await Enrollments.create(data);

    if (result) {
      await User.findByIdAndUpdate(userID, {
        $push: { enrolledCourses: result._id },
      });
      await Courses.findByIdAndUpdate(courseID, {
        $push: { enrollments: result._id },
      });
      return {
        success: true,
        message: "Enrollment successful",
        enrollmentId: result._id,
      };
    } else {
      return {
        success: false,
        message: "Failed to enroll in the course",
      };
    }
  } catch (error) {
    console.log("Error in enrollment:", error);
    throw new Error("An error occurred while enrolling in the course.");
  }
};

export const getAllEnrollmentsByInstructorId = async (id: string) => {
  try {
    await connectMongodb();
    const enrollments = await Enrollments.find({ instructor: id })
      .populate({ path: "instructor", model: "users" })
      .populate({ path: "purchased_by", model: "users" })
      .populate({ path: "purchased_course", model: "courses" })
      .lean();
    return JSON.parse(JSON.stringify(enrollments));
  } catch (error) {
    console.log("Error in getAllEnrollmentsByInstructorId:", error);
    throw new Error("Error while getting enrollments by instructor ID");
  }
};

export const addReview = async (data: ITestimonial) => {
  try {
    await connectMongodb();
    const review = await Testimonials.create(data);

    if (review) {
      await Courses.findByIdAndUpdate(data.course, {
        $push: { testimonials: review._id },
      });
      return { message: "Review successfully added", review: review };
    }
  } catch (error) {
    console.log("Error in addReview:", error);
    throw new Error("An error occurred while adding the review.");
  }
};

export const getAllReviews = async () => {
  try {
    await connectMongodb();
    const testimonials = await Testimonials.find({})
      .populate({ path: "user", model: "users" })
      .populate({ path: "course", model: "courses" });

    return JSON.parse(JSON.stringify(testimonials));
  } catch (error) {
    console.log("Error in getAllTestimonials:", error);
    throw new Error("Error while getting all testimonials");
  }
};

export const getReviewByUsername = async (username: string) => {
  try {
    await connectMongodb();
    const allReviews = await Testimonials.find({})
      .populate({ path: "user", model: "users" })
      .populate({ path: "course", model: "courses" });

    const userReview = allReviews.find(
      (review) =>
        review.user &&
        typeof review.user === "object" &&
        review.user.username === username
    );
    return JSON.parse(JSON.stringify(userReview));
  } catch (error) {
    console.log("Error in getReviewByUsername:", error);
    throw new Error("Error while getting testimonial by username");
  }
};

export const deleteReview = async (reviewId: string, courseId: string) => {
  try {
    await connectMongodb();
    await Testimonials.findByIdAndDelete(reviewId);
    await Courses.findByIdAndUpdate(courseId, {
      $pull: { testimonials: reviewId },
    });
    return { message: "Review successfully deleted" };
  } catch (error) {
    console.log("Error in deleteReview:", error);
    throw new Error("An error occurred while deleting the review.");
  }
};

export const editReview = async (
  reviewId: string,
  updatedData: ITestimonial
) => {
  try {
    await connectMongodb();
    const result = await Testimonials.findByIdAndUpdate(reviewId, updatedData, {
      new: true,
    });
    if (!result) {
      throw new Error("Review not found.");
    }
    return { message: "Review successfully updated", review: result };
  } catch (error) {
    console.log("Error in editReview:", error);
    throw new Error("An error occurred while editing the review.");
  }
};
