import { PlantsTable } from "../components/plants/PlantsTable";
import { useAppContext } from "../useAppContext";
export function Dashboard() {
  const context = useAppContext();
  const data = context?.plantsData;

  return (
    <div style={{ padding: "1rem 0" }}>
      <h1>Dashboard</h1>
      <PlantsTable data={data} />
    </div>
  );
}
