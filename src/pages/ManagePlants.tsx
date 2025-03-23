import { PlantsCardGrid } from "../components/plants/PlantsCardGrid";
import { Toolbar } from "../components/plants/Toolbar";

export function ManagePlants() {
  return (
    <div>
      <Toolbar />
      <PlantsCardGrid />
      <div style={{ height: "4rem" }}></div>
    </div>
  );
}
