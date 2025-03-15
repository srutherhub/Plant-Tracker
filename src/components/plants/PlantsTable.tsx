import { useEffect, useState } from "react";
import { Box } from "../../lib/Box";
import { Plant } from "../../models/plant";
import { useWaterPlant } from "./useWaterPlant";
import Droplet from "./Droplet";
import { Button, EButtonTypes } from "../../lib/Button";
import { useAppContext } from "../../useAppContext";
import { usePlants } from "./usePlants";

interface IPlantTableProps {
  title?: string;
  data: Plant[] | null | undefined;
}

export function PlantsTable(props: IPlantTableProps) {
  const { title, data } = props;
  const [plantsData, setPlantsData] = useState<Plant[] | null | undefined>(
    null
  );
  const { data: updatePlantsContext, plants } = usePlants();
  const context = useAppContext();
  const { setPlantsData: updateContext } = context;

  const numTableCols: string = 100 / 3 + "%";
  const rowStyle = { padding: "0.5rem", width: numTableCols };
  const { waterplant } = useWaterPlant();

  useEffect(() => {
    setPlantsData(data);
  }, [data]);

  const handleWaterPlant = async (item: Plant) => {
    try {
      await waterplant(item);
    } catch {
      throw new Error("Failed to water plant");
    }
    plants();
    updateContext(updatePlantsContext);
  };

  const plantsMap = plantsData?.map((item: Plant, index: number) => {
    return (
      <div
        key={index}
        style={{
          display: "flex",
          borderBottom: "1px solid var(--border)",
          alignItems: "center",
          padding: "0.25rem",
        }}
      >
        <Droplet plant={item} />
        <p style={rowStyle}>{item.name} </p>
        <p style={rowStyle}>{item.getLastWateredDate()}</p>
        <Button
          type={
            item.isWateringReqToday()
              ? EButtonTypes.tertiary
              : EButtonTypes.secondary
          }
          name="Water"
          iconName="bi bi-droplet"
          onclick={() => handleWaterPlant(item)}
        />
      </div>
    );
  });

  if (plantsData?.length == 0) {
    return <div></div>;
  }

  return (
    <Box padding="1rem">
      <h3>{title}</h3>
      {plantsMap}
    </Box>
  );
}
