import { IEnrollments } from "@/types";
import { formatDate } from "@/utils/dateFormatter";

interface ITable {
  enrollments: IEnrollments[];
}

const Table = ({ enrollments }: ITable) => {
  return (
    <>
      <div className="overflow-x-auto mt-10">
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
            {enrollments && enrollments.length > 0 ? (
              enrollments.map((item: IEnrollments, index) => (
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
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 p-4">
                  No enrollment data found. Please check back later or ensure
                  that courses are available for purchase.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
