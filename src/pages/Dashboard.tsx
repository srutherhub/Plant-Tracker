import { PlantsTable } from "../components/plants/PlantsTable";
import EmptyBox from "../lib/EmptyBox";
import { Plant } from "../models/plant";
import { useAppContext } from "../useAppContext";
export function Dashboard() {
  const context = useAppContext();
  const data = context?.plantsData;

  interface ISortedPlants {
    today: Plant[];
    later: Plant[];
  }
  const sortedPlants: ISortedPlants = { today: [], later: [] };
  data?.forEach((item) => {
    if (item.isWateringReqToday()) {
      sortedPlants.today.push(item);
    } else {
      sortedPlants.later.push(item);
    }
  });

  return (
    <div
      style={{
        padding: "1rem 0",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h1>Dashboard</h1>
      {sortedPlants.today.length == 0 ? (
        <EmptyBox
          title={"Plants to water today"}
          text={"No plants to water today!"}
        ></EmptyBox>
      ) : (
        <PlantsTable
          title={"Plants to water today"}
          data={sortedPlants.today}
        />
      )}
      {sortedPlants.later.length == 0 ? (
        <EmptyBox
          title={"Hydrated"}
          text={"Go to Manage to add plants."}
        ></EmptyBox>
      ) : (
        <PlantsTable title={"Hydrated"} data={sortedPlants.later} />
      )}
    </div>
  );
}
