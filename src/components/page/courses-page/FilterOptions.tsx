const FilterOptions = ({
  title,
  items,
  query,
  onChange,
}: {
  title: string;
  items: string[];
  query: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div>
    <h3 className="text-2xl font-semibold">{title}</h3>
    <hr className="my-2" />
    {items.map((item) => (
      <div key={item} className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text">{item}</span>
          <input
            id={item}
            name={item}
            checked={query.includes(item)}
            onChange={onChange}
            type="checkbox"
            className="checkbox checkbox-sm checkbox-primary"
          />
        </label>
      </div>
    ))}
  </div>
);

export default FilterOptions;
