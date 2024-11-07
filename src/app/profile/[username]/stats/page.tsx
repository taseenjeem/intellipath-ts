import {
  getAllEnrollmentsByInstructorId,
  getUserByUsername,
} from "@/database/server-actions";
import Table from "@/src/components/page/stats-page/Table";
import { IEnrollments, IUserInfo } from "@/types";

const StatsPage = async ({ params }: { params: { username: string } }) => {
  const instructor: IUserInfo = await getUserByUsername(params.username);
  const enrollments: IEnrollments[] = await getAllEnrollmentsByInstructorId(
    instructor._id
  );

  return (
    <>
      <Table enrollments={enrollments} />
    </>
  );
};

export default StatsPage;
