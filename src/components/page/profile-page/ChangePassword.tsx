import ChangePassForm from "./ChangePassForm";

const ChangePassword = () => {
  return (
    <section className="bg-base-200 p-4 md:p-6 mt-5 rounded-3xl">
      <div className="grid grid-cols-2 gap-20">
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
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
