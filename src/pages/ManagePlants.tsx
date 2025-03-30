import { useState } from "react";
import { PlantsCardGrid } from "../components/plants/PlantsCardGrid";
import { Toolbar } from "../components/plants/Toolbar";

export function ManagePlants() {
  const [search, setSearch] = useState<string>("");

  return (
    <div>
      <Toolbar setSearch={setSearch} />
      <PlantsCardGrid search={search} />
      <div style={{ height: "4rem" }}></div>
    </div>
  );
}
