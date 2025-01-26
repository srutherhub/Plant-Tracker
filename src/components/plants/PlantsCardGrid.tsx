import { useContext } from "react";
import { AppDataContext } from "../../App";
import { Plant } from "../../models/plant";
import { PlantCard } from "./PlantCard";

export function PlantsCardGrid() {
  const context = useContext(AppDataContext);

  if (!context) return <div></div>
  const { plantsData, setPlantsData } = context;

  const onDelete = (id: string) => {
    const updatedPlants = plantsData.filter((prev) => prev.id !== id);
    setPlantsData(updatedPlants);
  };

  const onUpdate = (id: string, input: Plant) => {
    const plantsDataCopy = plantsData.map((plant) => {
      if (plant.id === id) {
        return { ...plantsData, ...input };
      } else {
        return plant;
      }
    });
    setPlantsData(plantsDataCopy as Plant[]);
  };

  const plantsMap = plantsData?.map((item, index) => {
    return (
      <PlantCard
        key={index}
        data={item}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    );
  });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
        gap: "1rem",
      }}
    >
      {plantsMap}
    </div>
  );
}
