import { IEnrollments } from "@/types";

interface IReport {
  enrollments: IEnrollments[];
  totalCourses: number | undefined;
}

const Reports = ({ enrollments, totalCourses }: IReport) => {
  const totalEarnings = enrollments.reduce(
    (sum, enrollment) => sum + enrollment.amount_total,
    0
  );

  const platformCharge = enrollments.reduce(
    (sum, enrollment) => sum + enrollment.amount_total * 0.05,
    0
  );

  const netEarnings = totalEarnings - platformCharge;

  return (
    <>
      <section className="mt-10">
        <h2 className="text-2xl uppercase font-semibold text-primary mb-3">
          Reports
        </h2>
        <div className="bg-base-200 p-5 rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="border-b lg:border-b-0 md:border-0 lg:border-r pb-5 md:pb-0 border-gray-500 space-y-2">
            <h3>Total Courses Published</h3>
            <h3 className="text-2xl md:text-4xl font-semibold">
              {totalCourses}
            </h3>
          </div>
          <div className="border-b lg:border-b-0 md:border-0 lg:border-r pb-5 md:pb-0 border-gray-500 space-y-2">
            <h3>Total Earnings</h3>
            <h3 className="text-2xl md:text-4xl font-semibold">
              ${totalEarnings.toFixed(2)}
            </h3>
          </div>
          <div className="border-b lg:border-b-0 md:border-0 lg:border-r pb-5 md:pb-0 border-gray-500 space-y-2">
            <h3>Platform Charge (5%)</h3>
            <h3 className="text-2xl md:text-4xl font-semibold">
              ${platformCharge.toFixed(2)}
            </h3>
          </div>
          <div className="space-y-2">
            <h3>Net Earnings</h3>
            <h3 className="text-2xl md:text-4xl font-semibold">
              ${netEarnings.toFixed(2)}
            </h3>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reports;
