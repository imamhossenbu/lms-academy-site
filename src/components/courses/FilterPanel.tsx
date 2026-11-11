"use client";

import React from "react";
import type { AcademyCategory } from "@/types/academy";
import { FilterGroup } from "./FilterGroup";
import { useCatalog } from "./CatalogProvider";

/** Category, level and price filters (all single-choice, stored in the URL). */
export function FilterPanel({ categories, levels, scope = "side" }: { categories: AcademyCategory[]; levels: string[]; scope?: string }) {
  const { get, update } = useCatalog();
  const total = categories.reduce((s, c) => s + c.courses, 0);
  return (
    <div className="space-y-7">
      {categories.length > 0 && (
        <FilterGroup
          id={`${scope}-category`}
          title="Category"
          value={get("category")}
          onChange={(v) => update({ category: v || null })}
          options={[{ value: "", label: "All categories", count: total }, ...categories.map((c) => ({ value: c.slug, label: c.name, count: c.courses }))]}
        />
      )}
      {levels.length > 1 && (
        <FilterGroup id={`${scope}-level`} title="Level" value={get("level")} onChange={(v) => update({ level: v || null })} options={[{ value: "", label: "All levels" }, ...levels.map((l) => ({ value: l, label: l }))]} />
      )}
      <FilterGroup
        id={`${scope}-price`}
        title="Price"
        value={get("price")}
        onChange={(v) => update({ price: v || null })}
        options={[
          { value: "", label: "Any price" },
          { value: "free", label: "Free" },
          { value: "paid", label: "Paid" },
        ]}
      />
    </div>
  );
}

export default FilterPanel;
