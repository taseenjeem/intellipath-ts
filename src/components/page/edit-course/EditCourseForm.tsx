"use client";
import { initializeCourseData } from "@/redux/slices/editCourse";
import { useAppDispatch } from "@/redux/store";
import { ICourse } from "@/types";
import { useEffect } from "react";

const EditCourseForm = ({ course }: { course: ICourse }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeCourseData(course));
  }, [course, dispatch]);

  return <>Hello World</>;
};

export default EditCourseForm;
