import { FaFacebook, FaGoogle } from "react-icons/fa";

const SocialAuth = () => {
  return (
    <div className="card-body pt-1">
      <div className="divider">OR</div>
      <div className="grid gap-2 md:grid-cols-2">
        <button className="btn btn-primary btn-outline">
          <FaGoogle className="md:size-6 size-4" /> Google
        </button>
        <button className="btn btn-primary btn-outline">
          <FaFacebook className="md:size-6 size-4" /> Facebook
        </button>
      </div>
    </div>
  );
};

export default SocialAuth;
