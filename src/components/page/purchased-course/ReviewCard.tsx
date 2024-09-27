import Image from "next/image";
import { FaStar } from "react-icons/fa";

const ReviewCard = () => {
  return (
    <>
      <div className="bg-base-200 p-5 rounded-xl">
        <div className="flex  gap-2">
          <Image
            width={60}
            height={60}
            className="size-12 rounded-full"
            src="https://randomuser.me/api/portraits/men/8.jpg"
            alt="User Profile"
          />
          <div>
            <h4 className="font-semibold">John Doe</h4>
            <span className="flex gap-1 text-sm">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </span>
          </div>
        </div>
        <div>
          <p className="italic mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus soluta perspiciatis, inventore a reprehenderit vitae
            perferendis dolorum ratione error temporibus voluptates assumenda
            alias quasi! Fuga ducimus aperiam nisi sapiente aspernatur!
          </p>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
