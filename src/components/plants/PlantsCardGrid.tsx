import { useAppContext } from "../../useAppContext";
import { Plant } from "../../models/plant";
import { PlantCard } from "./PlantCard";
import { useSearch } from "../../lib/useSearch";
import { useEffect, useState } from "react";

export function PlantsCardGrid(props: { search: string }) {
  const { search } = props;
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
  const context = useAppContext();
  const { plantsData, setPlantsData } = context || {};
  const searching = useSearch();
  const onDelete = (id: string) => {
    const updatedPlants = plantsData?.filter((prev) => prev.id !== id);
    if (setPlantsData) {
      setPlantsData(updatedPlants);
    }
  };

  useEffect(() => {
    if (plantsData) {
      setFilteredPlants(plantsData || []);
    }
  }, [plantsData]);

  const onUpdate = (id: string, input: Plant) => {
    const plantsDataCopy = plantsData?.map((plant) => {
      if (plant.id === id) {
        return input;
      } else {
        return plant;
      }
    });
    if (setPlantsData) {
      setPlantsData(plantsDataCopy as Plant[]);
    }
  };

  useEffect(() => {
    if ((search !== "" || search == undefined) && search.length > 2) {
      const copy = plantsData?.filter((item) => {
        return searching(search, item.name) || searching(search, item.species);
      });
      setFilteredPlants(copy || []);
    } else {
      setFilteredPlants(plantsData || []);
    }
  }, [plantsData, search]);

  const plantsMap = filteredPlants?.map((item, index) => {
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
        gridTemplateColumns: "repeat(auto-fill, minmax(16rem, 1fr))",
        gap: "1rem",
      }}
    >
      {plantsMap}
    </div>
  );
}
