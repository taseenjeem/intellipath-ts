import { FaFacebook, FaGoogle } from "react-icons/fa";

const SocialAuth = () => {
  return (
    <div className="card-body pt-1">
      <div className="divider">OR</div>
      <form>
        <div className="grid gap-2 md:grid-cols-2">
          <button
            type="submit"
            name="action"
            value="google"
            className="btn btn-primary btn-outline"
          >
            <FaGoogle className="md:size-6 size-4" /> Google
          </button>
          <button
            type="submit"
            name="action"
            value="facebook"
            className="btn btn-primary btn-outline"
          >
            <FaFacebook className="md:size-6 size-4" /> Facebook
          </button>
        </div>
      </form>
    </div>
  );
};

export default SocialAuth;
