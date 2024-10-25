import {
  courseCategory,
  courseLanguages,
  courseLevel,
} from "@/database/static-data";

const Filters = () => {
  return (
    <>
      <aside className="w-1/5 hidden lg:block">
        <div className="mt-10 p-3 rounded-lg bg-base-200 sticky top-[108px] border border-primary space-y-4">
          <div>
            <h3 className="text-2xl font-semibold">Categories</h3>
            <hr className="my-2" />
            {courseCategory.map((item) => (
              <div key={item} className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">{item}</span>
                  <input
                    id={item}
                    name={item}
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-primary"
                  />
                </label>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Languages</h3>
            <hr className="my-2" />
            {courseLanguages.map((item) => (
              <div key={item} className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">{item}</span>
                  <input
                    id={item}
                    name={item}
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-primary"
                  />
                </label>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Course Level</h3>
            <hr className="my-2" />
            {courseLevel.map((item) => (
              <div key={item} className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">{item}</span>
                  <input
                    id={item}
                    name={item}
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-primary"
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Filters;
