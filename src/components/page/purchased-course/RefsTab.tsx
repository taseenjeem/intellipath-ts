import Link from "next/link";
import { BiLinkExternal } from "react-icons/bi";

const RefsTab = () => {
  return (
    <>
      <input
        type="radio"
        name="course_tabs"
        role="tab"
        className="tab"
        aria-label="References"
      />
      <div role="tabpanel" className="tab-content pt-5 min-h-[60vh]">
        <ul className="flex flex-col gap-2">
          <li className="inline-block">
            <Link
              href={`#`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 link-hover hover:text-primary duration-150"
            >
              <BiLinkExternal /> Lorem ipsum dolor sit amet
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default RefsTab;
