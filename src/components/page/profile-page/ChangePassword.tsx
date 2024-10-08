import ChangePassForm from "./ChangePassForm";
import ResetPassForm from "./ResetPassForm";

const ChangePassword = () => {
  return (
    <section className="bg-base-200 p-4 md:p-6 mt-10 md:mt-20 rounded-3xl">
      <div className="grid md:grid-cols-2 gap-20">
        <div>
          <h3 className="text-2xl font-semibold text-primary mb-5">
            Change your password
          </h3>
          <ChangePassForm />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-primary mb-5">
            Reset password
          </h3>
          <ResetPassForm />
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
