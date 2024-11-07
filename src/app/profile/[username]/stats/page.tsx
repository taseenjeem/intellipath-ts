import {
  getAllEnrollmentsByInstructorId,
  getUserByUsername,
} from "@/database/server-actions";
import { IEnrollments, IUserInfo } from "@/types";
import { formatDate } from "@/utils/dateFormatter";

const StatsPage = async ({ params }: { params: { username: string } }) => {
  const instructor: IUserInfo = await getUserByUsername(params.username);
  const enrollments: IEnrollments[] = await getAllEnrollmentsByInstructorId(
    instructor._id
  );

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Email</th>
              <th>Purchased Course</th>
              <th>Purchase Date</th>
              <th>Purchased Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {enrollments.map((item: IEnrollments, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  {item.purchased_by.firstName} {item.purchased_by.lastName}
                </td>
                <td>{item.purchased_by.email}</td>
                <td>{item.purchased_course.title}</td>
                <td>{formatDate(item.createdAt?.toString())}</td>
                <td>$ {item.amount_total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StatsPage;
