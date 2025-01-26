import { useEffect, useState } from "react";
import { useDeletePlant } from "./useDeletePlant";
import { Box } from "../../lib/Box";
import { Icon } from "../../lib/Icon";
import { Plant } from "../../models/plant";

interface IPlantTableProps {
  data: Plant[] | null | undefined
}

export function PlantsTable(props: IPlantTableProps) {
  const { data } = props
  const [plantsData, setPlantsData] = useState<Plant[] | null | undefined>(null)
  const { data: response, loading, error, deleteplant } = useDeletePlant()

  const numTableCols: string = 100 / 7 + "%"
  const rowStyle = { padding: "0.5rem", width: numTableCols };

  useEffect(() => {
    setPlantsData(data)
  }, [data])

  const handleDelete = async (id: string) => {
    try {
      await deleteplant(id)
      setPlantsData(plantsData?.filter((item) => item.id !== id))
    } catch {
      console.log(response, error)
    }
  }

  const plantsMap = plantsData?.map((item: Plant, index: number) => {
    return (
      <div
        key={index}
        style={{
          display: "flex",
          borderBottom: "1px solid var(--border)",
          backgroundColor: getBackgroundColor(index),
        }}
      >
        <p style={rowStyle}>{item.name} </p>
        <p style={rowStyle}>{item.species}</p>
        <p style={rowStyle}>{item.type}</p>
        <p style={rowStyle}>{item.last_watered.toString()}</p>
        <p style={rowStyle}>{item.next_watering.toString()}</p>
        <p style={rowStyle}>{item.watering_frequency}</p>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "end", alignContent: "center", padding: "0.5rem", width: numTableCols }}>
          <Icon iconName="bi bi-pencil" />
          <Icon iconName="bi bi-trash3" loading={loading} onclick={() => { handleDelete(item.id) }} />
        </div>
      </div>
    );
  });
  return (
    <div>
      {plantsData === null ? (
        ""
      ) : (
        <Box>
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid var(--border)",
              backgroundColor: "var(--primary-lt)",
            }}
          >
            <p style={rowStyle}>Name</p>
            <p style={rowStyle}>Species</p>
            <p style={rowStyle}>Type</p>
            <p style={rowStyle}>Last Watered</p>
            <p style={rowStyle}>Next Watering</p>
            <p style={rowStyle}>Watering Frequency (Days)</p>
            <p style={rowStyle}></p>
          </div>
          {plantsMap}
        </Box>
      )}{" "}
    </div>
  );
}



function getBackgroundColor(index: number): string {
  if (index % 2 !== 0) return "var(--secondary-bg)";
  else return "";
}
