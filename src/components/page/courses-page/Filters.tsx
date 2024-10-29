"use client";
import {
  courseCategory,
  courseLanguages,
  courseLevel,
} from "@/database/static-data";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FilterOptions from "./FilterOptions";

const Filters = () => {
  const [categoryQuery, setCategoryQuery] = useState<string[]>([]);
  const [languageQuery, setLanguageQuery] = useState<string[]>([]);
  const [levelQuery, setLevelQuery] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setQuery: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const { name, checked } = event.target;
    setQuery((prev) =>
      checked ? [...prev, name] : prev.filter((item) => item !== name)
    );
  };

  useEffect(() => {
    const category = searchParams.get("category");
    const language = searchParams.get("language");
    const level = searchParams.get("level");

    if (category) setCategoryQuery(decodeURI(category).split("|"));
    if (language) setLanguageQuery(decodeURI(language).split("|"));
    if (level) setLevelQuery(decodeURI(level).split("|"));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const updateParams = (key: string, query: string[]) => {
      query.length
        ? params.set(key, encodeURI(query.join("|")))
        : params.delete(key);
    };

    updateParams("category", categoryQuery);
    updateParams("language", languageQuery);
    updateParams("level", levelQuery);

    router.replace(`${pathname}?${params.toString()}`);
  }, [categoryQuery, languageQuery, levelQuery]);

  return (
    <aside className="w-1/5 hidden lg:block">
      <div className="mt-10 p-3 rounded-lg bg-base-200 sticky top-[108px] border border-primary space-y-4">
        <FilterOptions
          title="Categories"
          items={courseCategory}
          query={categoryQuery}
          onChange={(e) => handleCheckboxChange(e, setCategoryQuery)}
        />
        <FilterOptions
          title="Languages"
          items={courseLanguages}
          query={languageQuery}
          onChange={(e) => handleCheckboxChange(e, setLanguageQuery)}
        />
        <FilterOptions
          title="Course Level"
          items={courseLevel}
          query={levelQuery}
          onChange={(e) => handleCheckboxChange(e, setLevelQuery)}
        />
      </div>
    </aside>
  );
};

export default Filters;
