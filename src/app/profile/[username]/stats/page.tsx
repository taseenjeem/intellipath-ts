import {
  getAllEnrollmentsByInstructorId,
  getUserByUsername,
} from "@/database/server-actions";
import Reports from "@/src/components/page/stats-page/Reports";
import Table from "@/src/components/page/stats-page/Table";
import { IEnrollments, IUserInfo } from "@/types";

const StatsPage = async ({ params }: { params: { username: string } }) => {
  const instructor: IUserInfo = await getUserByUsername(params.username);
  const enrollments: IEnrollments[] = await getAllEnrollmentsByInstructorId(
    instructor._id
  );

  return (
    <>
      <Reports
        enrollments={enrollments}
        totalCourses={instructor.courses?.length}
      />
      <Table enrollments={enrollments} />
    </>
  );
};

export default StatsPage;
