import { useEffect, useState } from "react";
import { usePlants } from "./usePlants";
import { useDeletePlant } from "./useDeletePlant";
import { Box } from "../../lib/Box";
import { Icon } from "../../lib/Icon";
import { IPlant } from "./usePlants";


export function Plants() {
  const [plantsData, setPlantsData] = useState<IPlant[] | null | undefined>(null)
  const { data, plants } = usePlants();
  const { response, loading, error, deleteplant } = useDeletePlant()

  const numTableCols: string = 100 / 6 + "%"
  const rowStyle = { padding: "0.5rem", width: numTableCols };

  useEffect(() => {
    plants();
  }, []);

  useEffect(() => {
    setPlantsData(data)
  }, [data])

  const handleDelete = async (id: string) => {
    try {
      await deleteplant(id)
      setPlantsData(plantsData?.filter((item) => item.id !== id))
    } catch {
      console.log(error)
    }
  }

  const plantsMap = plantsData?.map((item: IPlant, index: number) => {
    return (
      <div
        key={index}
        style={{
          display: "flex",
          borderBottom: "1px solid var(--border)",
          backgroundColor: getBackgroundColor(index),
          fontSize: "0.875rem",
        }}
      >
        <p style={rowStyle}>{item.name} </p>
        <p style={rowStyle}>{item.species}</p>
        <p style={rowStyle}>{item.type}</p>
        <p style={rowStyle}>{item.last_watered}</p>
        <p style={rowStyle}>{item.next_watering}</p>
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
