"use client";
import { BiSolidCoupon } from "react-icons/bi";
import { IoIosCloseCircle } from "react-icons/io";

interface ICoupon {
  _id?: string;
  code: string;
  discount: number;
}

interface ICouponModalProps {
  coupons: ICoupon[] | [];
}

const CouponModal = ({ coupons }: ICouponModalProps) => {
  const openModal = () => {
    const filterModal = document.getElementById(
      "coupon_modal"
    ) as HTMLDialogElement | null;

    if (filterModal) {
      filterModal.showModal();
    }
  };

  const closeModal = () => {
    const filterModal = document.getElementById(
      "coupon_modal"
    ) as HTMLDialogElement | null;

    if (filterModal) {
      filterModal.close();
    }
  };

  return (
    <>
      <button
        className="btn md:size-16 btn-secondary btn-circle fixed bottom-5 right-5 md:bottom-10 md:right-10 animate-bounce"
        onClick={openModal}
      >
        <span>
          <BiSolidCoupon size={30} />
        </span>
      </button>
      <dialog id="coupon_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box overflow-auto">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-secondary">Coupons</h3>
            <button onClick={closeModal}>
              <IoIosCloseCircle size={25} className="text-secondary" />
            </button>
          </div>
          <p className="text-sm mt-1">
            Use coupon codes to get exiting discounts
          </p>
          {coupons.length === 0 ? (
            <div className="text-center mt-5 border rounded-xl p-8">
              <p>There is no coupon right now. Please check out later</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {coupons.map((coupon) => (
                <div
                  key={coupon._id}
                  className="p-3 border rounded-xl flex flex-col justify-center items-center"
                >
                  <p className="font-bold">{coupon.code}</p>
                  <p className="text-sm text-secondary">
                    -{coupon.discount}% off
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </dialog>
    </>
  );
};

export default CouponModal;
