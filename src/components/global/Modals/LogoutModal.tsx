"use client";
import { resetUserInfo } from "@/redux/slices/UserInfoSlice";
import { useAppDispatch } from "@/redux/store";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LogoutModal = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const closeModal = () => {
    const logoutModal = document.getElementById(
      "logout-modal"
    ) as HTMLDialogElement | null;
    if (logoutModal) {
      logoutModal.close();
    }
  };

  const logout = async () => {
    try {
      await signOut({ redirect: false });
      dispatch(resetUserInfo());
      toast.success("Logged out successfully!");
      closeModal();
      router.push("/");
    } catch (error) {
      toast.error("An error occurred during logout.");
    }
  };

  return (
    <>
      <dialog id="logout-modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-2xl text-primary">
            Are you sure you want to logout?
          </h3>
          <p className="py-4">
            Your learning journey will be paused, but you can always resume
            anytime. See you soon!
          </p>
          <div className="flex justify-end gap-5">
            <button onClick={logout} className="btn btn-primary">
              Logout
            </button>
            <button onClick={closeModal} className="btn btn-primary">
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default LogoutModal;
